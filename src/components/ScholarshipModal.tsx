import React, { useState } from 'react';
import { Scholarship, ApplicationStatus } from '../types';
import { 
  X, 
  ExternalLink, 
  Calendar, 
  Award, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  BookmarkCheck, 
  Globe, 
  Sparkles,
  DollarSign,
  Clock,
  Send,
  Building2
} from 'lucide-react';

interface ScholarshipModalProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToTracker: (id: string, status: ApplicationStatus) => void;
  onOpenEssayCoachWithTitle: (title: string) => void;
}

export const ScholarshipModal: React.FC<ScholarshipModalProps> = ({
  scholarship,
  onClose,
  isSaved,
  onToggleSave,
  onAddToTracker,
  onOpenEssayCoachWithTitle,
}) => {
  if (!scholarship) return null;

  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('in_progress');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleTrackSubmit = () => {
    onAddToTracker(scholarship.id, selectedStatus);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                {scholarship.provider}
              </span>
              {scholarship.isFullyFunded && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Fully Funded
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {scholarship.title}
            </h2>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Award: <strong className="text-white">{scholarship.amount}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span>Deadline: <strong className="text-white">{scholarship.deadline}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Region: <strong className="text-white">{scholarship.region.join(', ')}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* Overview / Purpose */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>Program Overview</span>
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {scholarship.description}
            </p>
          </section>

          {/* Grid: Eligibility & Document Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Eligibility Criteria */}
            <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 space-y-3">
              <h4 className="text-sm font-bold text-purple-950 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
                <span>Eligibility Checklist</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {scholarship.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100 space-y-3">
              <h4 className="text-sm font-bold text-pink-950 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-700" />
                <span>Required Documents</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {scholarship.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Key Dates Timeline if available */}
          {scholarship.keyDates && scholarship.keyDates.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Key Application Dates</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scholarship.keyDates.map((kd, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">{kd.event}</p>
                    <p className="text-sm font-bold text-slate-900">{kd.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Essay Coach Assistant Shortcut Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Application Assistant</span>
              </div>
              <p className="text-sm font-semibold text-white">Drafting an essay for {scholarship.title}?</p>
              <p className="text-xs text-slate-300">Get instant AI feedback on leadership, structure, and tone.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenEssayCoachWithTitle(scholarship.title);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 transition-all shadow"
            >
              Review Essay Draft
            </button>
          </div>

          {/* Tracker Status Selector Bar */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Add to My Application Tracker</span>
              {addedNotice && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-fadeIn">
                  Added to Application Tracker!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="saved">Saved / Bookmarked</option>
                <option value="in_progress">In Progress (Drafting)</option>
                <option value="submitted">Submitted</option>
                <option value="interview">Interview Scheduled</option>
                <option value="awarded">Awarded 🎉</option>
              </select>

              <button
                onClick={handleTrackSubmit}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save to Tracker</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              isSaved
                ? 'bg-purple-100 text-purple-800 border-purple-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-purple-700" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Saved in Library' : 'Save Scholarship'}</span>
          </button>

          <a
            href={scholarship.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
          >
            <span>Apply on Official Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
