import React, { useState } from 'react';
import { UserProfile, MatchResult, Scholarship } from '../types';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  GraduationCap, 
  Globe, 
  DollarSign, 
  UserCheck, 
  ArrowRight,
  RefreshCw,
  Award,
  Lightbulb
} from 'lucide-react';

interface AIMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onMatchesComputed: (matches: MatchResult[]) => void;
}

export const AIMatcherModal: React.FC<AIMatcherModalProps> = ({
  isOpen,
  onClose,
  scholarships,
  onSelectScholarship,
  onMatchesComputed,
}) => {
  if (!isOpen) return null;

  const [profile, setProfile] = useState<UserProfile>({
    educationLevel: 'Undergraduate',
    fieldOfStudy: 'STEM (Science, Tech, Eng, Math)',
    countryOfOrigin: 'India',
    targetCountry: 'United States',
    gpa: '3.7 / 4.0',
    financialNeed: 'High',
    specialStatus: ['First-generation student', 'Minority in STEM'],
    careerGoals: 'Pursue computer science and create AI tools that support female healthcare and education in rural communities.',
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const specialStatusOptions = [
    'First-generation student',
    'Single mother / Caregiver',
    'Minority in STEM',
    'Returning to education after career gap',
    'Refugee / Displaced scholar',
    'Community Leader / Volunteer'
  ];

  const handleStatusToggle = (option: string) => {
    setProfile(prev => {
      const exists = prev.specialStatus.includes(option);
      return {
        ...prev,
        specialStatus: exists 
          ? prev.specialStatus.filter(o => o !== option)
          : [...prev.specialStatus, option]
      };
    });
  };

  const handleRunMatch = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/match-scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate scholarship matches.');
      }

      const data = await res.json();
      if (data.matches && Array.isArray(data.matches)) {
        setResults(data.matches);
        onMatchesComputed(data.matches);
      } else {
        throw new Error('Invalid match data format returned from server.');
      }
    } catch (err: any) {
      console.error('Match error:', err);
      setErrorMsg(err.message || 'An error occurred while evaluating matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 fill-amber-300" />
            <span>AI Eligibility Matcher</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find Your Highest-Match Women Scholarships
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Our Gemini AI evaluates your academic standing, field of study, financial need, and background to calculate tailor-fitted scholarship recommendations.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {!results ? (
            /* Step 1: Questionnaire Form */
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Education Level */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span>Education Level</span>
                  </label>
                  <select
                    value={profile.educationLevel}
                    onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="High School Senior">High School Senior</option>
                    <option value="Undergraduate">Undergraduate Student</option>
                    <option value="Graduate / Master's">Master's / Graduate Student</option>
                    <option value="PhD / Postdoctoral">PhD / Postdoctoral Researcher</option>
                    <option value="Vocational & Skill Training">Vocational / Technical Certification</option>
                    <option value="Adult & Re-entry Student">Adult & Re-entry Student</option>
                  </select>
                </div>

                {/* Field of Study */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-pink-600" />
                    <span>Field of Study</span>
                  </label>
                  <select
                    value={profile.fieldOfStudy}
                    onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="STEM (Science, Tech, Eng, Math)">STEM (Computer Science, Engineering, AI, Math)</option>
                    <option value="Medicine & Public Health">Medicine, Nursing, Public Health</option>
                    <option value="Business & Entrepreneurship">Business, Economics, Startups</option>
                    <option value="Arts & Humanities">Arts, Design, Humanities</option>
                    <option value="Law, Policy & Social Impact">Law, Human Rights, Public Policy</option>
                    <option value="Environmental & Agricultural Sciences">Environmental & Earth Sciences</option>
                    <option value="General Academic">General Studies / Undecided</option>
                  </select>
                </div>

                {/* Country of Origin */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span>Country of Citizenship / Origin</span>
                  </label>
                  <input
                    type="text"
                    value={profile.countryOfOrigin}
                    onChange={(e) => setProfile({ ...profile, countryOfOrigin: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="e.g. India, Nigeria, Brazil, USA, Philippines..."
                  />
                </div>

                {/* Target Country */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-pink-600" />
                    <span>Target Study Location</span>
                  </label>
                  <input
                    type="text"
                    value={profile.targetCountry}
                    onChange={(e) => setProfile({ ...profile, targetCountry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="e.g. USA, Canada, UK, Europe, Global Online..."
                  />
                </div>

                {/* GPA */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                    GPA / Academic Grade Standing
                  </label>
                  <input
                    type="text"
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="e.g. 3.7/4.0 or First Class Honors or 85%"
                  />
                </div>

                {/* Financial Need */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Financial Need Level</span>
                  </label>
                  <select
                    value={profile.financialNeed}
                    onChange={(e) => setProfile({ ...profile, financialNeed: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="Severe">Severe (Full funding required)</option>
                    <option value="High">High (Substantial grant needed)</option>
                    <option value="Moderate">Moderate (Tuition gap support)</option>
                    <option value="Low">Low (Merit recognition preferred)</option>
                  </select>
                </div>

              </div>

              {/* Special Status Checklist */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  <span>Background & Identity Factors (Check all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {specialStatusOptions.map((opt) => {
                    const isChecked = profile.specialStatus.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleStatusToggle(opt)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                          isChecked
                            ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Career & Leadership Statement */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Brief Leadership & Career Goals Statement
                </label>
                <textarea
                  rows={3}
                  value={profile.careerGoals}
                  onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Describe your research passions, career aspirations, and how you aim to support women/girls in your future profession..."
                />
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  {errorMsg}
                </div>
              )}

            </div>
          ) : (
            /* Step 2: Evaluation Results */
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Your AI-Evaluated Matches</h3>
                  <p className="text-xs text-slate-500">Based on your academic profile, country, and gender leadership goals</p>
                </div>
                <button
                  onClick={() => setResults(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Modify Profile</span>
                </button>
              </div>

              <div className="space-y-4">
                {results.map((resItem) => {
                  const scholarship = scholarships.find(s => s.id === resItem.scholarshipId);
                  if (!scholarship) return null;

                  return (
                    <div 
                      key={resItem.scholarshipId}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[11px] font-bold text-purple-700 uppercase">{scholarship.provider}</span>
                          <h4 className="text-base font-bold text-slate-900">{scholarship.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-900 border border-purple-200">
                            ✨ {resItem.matchPercentage}% Match
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                            {scholarship.amount}
                          </span>
                        </div>
                      </div>

                      {/* Match Rationale */}
                      <p className="text-xs sm:text-sm text-slate-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                        <strong>Match Rationale:</strong> {resItem.matchReason}
                      </p>

                      {/* Strengths & Tips Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Your Candidate Strengths</span>
                          </p>
                          <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                            {resItem.strengthPoints.map((sp, idx) => (
                              <li key={idx}>{sp}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                          <p className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>Actionable Application Tips</span>
                          </p>
                          <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                            {resItem.recommendationTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectScholarship(scholarship);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors shadow-sm"
                        >
                          <span>Open Full Grant Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* Modal Sticky Footer */}
        {!results && (
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={handleRunMatch}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Matches with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Calculate Scholarship Matches</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
