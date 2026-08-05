import React, { useState, useEffect, useMemo } from 'react';
import { SCHOLARSHIPS_DATA } from './data/scholarships';
import { 
  Scholarship, 
  FilterOptions, 
  EducationLevel, 
  FieldOfStudy, 
  RegionScope, 
  FundingType, 
  ApplicationTrackerItem, 
  ApplicationStatus,
  MatchResult
} from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScholarshipCard } from './components/ScholarshipCard';
import { ScholarshipModal } from './components/ScholarshipModal';
import { AIMatcherModal } from './components/AIMatcherModal';
import { AIEssayAssistant } from './components/AIEssayAssistant';
import { TrackerView } from './components/TrackerView';
import { EducationResources } from './components/EducationResources';
import { BudgetCalculator } from './components/BudgetCalculator';
import { Footer } from './components/Footer';

import { 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Search, 
  ArrowUpDown,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [searchValue, setSearchValue] = useState<string>('');

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    level: 'All Levels',
    field: 'All Fields',
    region: 'Global / All Countries',
    fundingType: 'All Funding Types',
    minAmount: 0,
    sortBy: 'deadline',
    onlyFullyFunded: false,
    onlyClosingSoon: false,
  });

  // Saved Scholarship IDs in LocalStorage
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('eduher_saved_ids');
      return stored ? JSON.parse(stored) : ['aauw-international-fellowship', 'google-women-techmakers'];
    } catch {
      return ['aauw-international-fellowship', 'google-women-techmakers'];
    }
  });

  // Application Tracker items
  const [trackerItems, setTrackerItems] = useState<ApplicationTrackerItem[]>(() => {
    try {
      const stored = localStorage.getItem('eduher_tracker_items');
      if (stored) return JSON.parse(stored);
    } catch {}

    // Default initial tracker state
    return [
      {
        scholarshipId: 'aauw-international-fellowship',
        status: 'in_progress',
        notes: 'Requested transcripts from university registrar.',
        addedAt: new Date().toISOString(),
        checklist: [
          { id: 'transcripts', label: 'Official Academic Transcripts', completed: true },
          { id: 'essay', label: 'Personal Statement Drafted', completed: false },
          { id: 'recommendations', label: '2 Letters of Recommendation', completed: false },
          { id: 'financial_proof', label: 'Financial Need Declaration', completed: false },
        ]
      },
      {
        scholarshipId: 'google-women-techmakers',
        status: 'saved',
        notes: 'Essay prompt focuses on female tech leadership.',
        addedAt: new Date().toISOString(),
        checklist: [
          { id: 'transcripts', label: 'Official Academic Transcripts', completed: false },
          { id: 'essay', label: 'Leadership Essays (4 prompts)', completed: false },
          { id: 'recommendations', label: '1 Faculty Recommendation', completed: false },
        ]
      }
    ];
  });

  // AI Match Results
  const [aiMatchResults, setAiMatchResults] = useState<MatchResult[]>([]);

  // Selected Modal Scholarship
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // AI Matcher Modal open state
  const [isAIMatcherOpen, setIsAIMatcherOpen] = useState(false);

  // Prefilled Essay Coach Title
  const [prefilledEssayTitle, setPrefilledEssayTitle] = useState('');

  // Persist savedIds
  useEffect(() => {
    try {
      localStorage.setItem('eduher_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Persist trackerItems
  useEffect(() => {
    try {
      localStorage.setItem('eduher_tracker_items', JSON.stringify(trackerItems));
    } catch (e) {
      console.error(e);
    }
  }, [trackerItems]);

  // Sync Search value
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchValue }));
  }, [searchValue]);

  // Toggle Save / Bookmark
  const handleToggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add / Update Tracker Item
  const handleAddToTracker = (scholarshipId: string, status: ApplicationStatus) => {
    setTrackerItems(prev => {
      const existing = prev.find(i => i.scholarshipId === scholarshipId);
      if (existing) {
        return prev.map(i =>
          i.scholarshipId === scholarshipId ? { ...i, status } : i
        );
      } else {
        return [
          ...prev,
          {
            scholarshipId,
            status,
            notes: '',
            addedAt: new Date().toISOString(),
            checklist: [
              { id: 'transcripts', label: 'Academic Transcripts', completed: false },
              { id: 'essay', label: 'Personal Essay / Statement', completed: false },
              { id: 'recommendations', label: 'Letters of Recommendation', completed: false },
              { id: 'form', label: 'Application Form Submitted', completed: false },
            ]
          }
        ];
      }
    });

    // Also save id
    if (!savedIds.includes(scholarshipId)) {
      setSavedIds(prev => [...prev, scholarshipId]);
    }
  };

  const handleUpdateTrackerStatus = (scholarshipId: string, status: ApplicationStatus) => {
    setTrackerItems(prev =>
      prev.map(item => (item.scholarshipId === scholarshipId ? { ...item, status } : item))
    );
  };

  const handleToggleChecklist = (scholarshipId: string, checklistId: string) => {
    setTrackerItems(prev =>
      prev.map(item => {
        if (item.scholarshipId !== scholarshipId) return item;
        return {
          ...item,
          checklist: item.checklist.map(c =>
            c.id === checklistId ? { ...c, completed: !c.completed } : c
          )
        };
      })
    );
  };

  const handleRemoveTracked = (scholarshipId: string) => {
    setTrackerItems(prev => prev.filter(i => i.scholarshipId !== scholarshipId));
  };

  const handleQuickTagSelect = (filterVal: string) => {
    if (filterVal === 'fully_funded') {
      setFilters(prev => ({ ...prev, onlyFullyFunded: true }));
    } else if (filterVal.includes('STEM')) {
      setFilters(prev => ({ ...prev, field: 'STEM (Science, Tech, Eng, Math)' as FieldOfStudy }));
    } else if (filterVal.includes('Global')) {
      setFilters(prev => ({ ...prev, region: 'Global / All Countries' as RegionScope }));
    } else if (filterVal.includes('Graduate')) {
      setFilters(prev => ({ ...prev, level: 'Graduate / Master\'s' as EducationLevel }));
    } else if (filterVal.includes('Adult')) {
      setFilters(prev => ({ ...prev, level: 'Adult & Re-entry Student' as EducationLevel }));
    }
  };

  const handleResetFilters = () => {
    setSearchValue('');
    setFilters({
      search: '',
      level: 'All Levels',
      field: 'All Fields',
      region: 'Global / All Countries',
      fundingType: 'All Funding Types',
      minAmount: 0,
      sortBy: 'deadline',
      onlyFullyFunded: false,
      onlyClosingSoon: false,
    });
  };

  const handleOpenEssayCoachWithTitle = (title: string) => {
    setPrefilledEssayTitle(title);
    setActiveTab('essay-coach');
  };

  // Filtered & Sorted Scholarships computation
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter(item => {
      // Search term
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesProvider = item.provider.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesAudience = item.targetAudience.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesProvider && !matchesDesc && !matchesAudience && !matchesTags) {
          return false;
        }
      }

      // Level
      if (filters.level !== 'All Levels') {
        if (!item.level.includes(filters.level)) return false;
      }

      // Field
      if (filters.field !== 'All Fields') {
        if (!item.field.includes(filters.field)) return false;
      }

      // Region
      if (filters.region !== 'Global / All Countries') {
        if (!item.region.includes('Global / All Countries') && !item.region.includes(filters.region)) {
          return false;
        }
      }

      // Fully Funded
      if (filters.onlyFullyFunded && !item.isFullyFunded) {
        return false;
      }

      // Min amount
      if (filters.minAmount > 0 && item.amountValue < filters.minAmount) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'amount_high') {
        return b.amountValue - a.amountValue;
      } else if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (filters.sortBy === 'match') {
        const matchA = aiMatchResults.find(m => m.scholarshipId === a.id)?.matchPercentage || 0;
        const matchB = aiMatchResults.find(m => m.scholarshipId === b.id)?.matchPercentage || 0;
        return matchB - matchA;
      } else {
        // Sort by deadline
        return new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime();
      }
    });
  }, [filters, aiMatchResults]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenAIMatcher={() => setIsAIMatcherOpen(true)}
      />

      {/* Hero Section (only on Explore tab) */}
      {activeTab === 'explore' && (
        <Hero
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onOpenAIMatcher={() => setIsAIMatcherOpen(true)}
          onSelectQuickTag={handleQuickTagSelect}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Filter Controls Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-purple-700" />
                  <h2 className="text-base font-bold text-slate-900">Scholarship Search & Directory Filters</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                    {filteredScholarships.length} Results
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Reset Button */}
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>

                  {/* AI Matcher Trigger */}
                  <button
                    onClick={() => setIsAIMatcherOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Matcher</span>
                  </button>
                </div>
              </div>

              {/* Filter Select Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Level */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Education Level</label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({ ...filters, level: e.target.value as EducationLevel })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="All Levels">All Education Levels</option>
                    <option value="High School Senior">High School Senior</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate / Master's">Graduate / Master's</option>
                    <option value="PhD / Postdoctoral">PhD / Postdoctoral</option>
                    <option value="Vocational & Skill Training">Vocational & Skills</option>
                    <option value="Adult & Re-entry Student">Adult & Re-entry</option>
                  </select>
                </div>

                {/* Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Field of Study</label>
                  <select
                    value={filters.field}
                    onChange={(e) => setFilters({ ...filters, field: e.target.value as FieldOfStudy })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="All Fields">All Study Fields</option>
                    <option value="STEM (Science, Tech, Eng, Math)">STEM & Technology</option>
                    <option value="Medicine & Public Health">Medicine & Health</option>
                    <option value="Business & Entrepreneurship">Business & Startups</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                    <option value="Law, Policy & Social Impact">Law & Human Rights</option>
                    <option value="Environmental & Agricultural Sciences">Environment & Agriculture</option>
                    <option value="General Academic">General Academic</option>
                  </select>
                </div>

                {/* Region */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Region Scope</label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value as RegionScope })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Global / All Countries">Global / All Regions</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia-Pacific">Asia-Pacific</option>
                    <option value="Africa">Africa</option>
                    <option value="Latin America & Caribbean">Latin America</option>
                    <option value="Middle East">Middle East</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Sort Directory By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="deadline">Upcoming Deadline</option>
                    <option value="amount_high">Highest Award Amount</option>
                    <option value="match">Highest AI Match</option>
                    <option value="title">Alphabetical (Title)</option>
                  </select>
                </div>

              </div>

              {/* Checkbox Toggles */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.onlyFullyFunded}
                    onChange={(e) => setFilters({ ...filters, onlyFullyFunded: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Show Only Fully Funded Grants</span>
                </label>
              </div>

            </div>

            {/* Scholarship Cards Grid */}
            {filteredScholarships.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Scholarships Match Your Current Filters</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Try broadening your search criteria or reset filters to view all available women education scholarships.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs shadow hover:bg-purple-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship) => {
                  const match = aiMatchResults.find(m => m.scholarshipId === scholarship.id);
                  const isSaved = savedIds.includes(scholarship.id);

                  return (
                    <ScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                      isSaved={isSaved}
                      onToggleSave={handleToggleSave}
                      onSelect={(s) => setSelectedScholarship(s)}
                      matchResult={match}
                    />
                  );
                })}
              </div>
            )}

          </div>
        )}

        {activeTab === 'essay-coach' && (
          <AIEssayAssistant
            scholarships={SCHOLARSHIPS_DATA}
            prefilledTitle={prefilledEssayTitle}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerView
            trackedItems={trackerItems}
            scholarships={SCHOLARSHIPS_DATA}
            onUpdateStatus={handleUpdateTrackerStatus}
            onToggleChecklist={handleToggleChecklist}
            onRemoveTracked={handleRemoveTracked}
            onSelectScholarship={(s) => setSelectedScholarship(s)}
          />
        )}

        {activeTab === 'resources' && <EducationResources />}

        {activeTab === 'calculator' && <BudgetCalculator />}
      </main>

      {/* Scholarship Modal Popup */}
      <ScholarshipModal
        scholarship={selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        isSaved={selectedScholarship ? savedIds.includes(selectedScholarship.id) : false}
        onToggleSave={handleToggleSave}
        onAddToTracker={handleAddToTracker}
        onOpenEssayCoachWithTitle={handleOpenEssayCoachWithTitle}
      />

      {/* AI Matcher Modal Popup */}
      <AIMatcherModal
        isOpen={isAIMatcherOpen}
        onClose={() => setIsAIMatcherOpen(false)}
        scholarships={SCHOLARSHIPS_DATA}
        onSelectScholarship={(s) => setSelectedScholarship(s)}
        onMatchesComputed={(matches) => setAiMatchResults(matches)}
      />

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenAIMatcher={() => setIsAIMatcherOpen(true)}
      />

    </div>
  );
}
