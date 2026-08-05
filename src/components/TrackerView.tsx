import React, { useState } from 'react';
import { Scholarship, ApplicationTrackerItem, ApplicationStatus } from '../types';
import { 
  BookmarkCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Trash2, 
  ExternalLink,
  PlusCircle,
  Award,
  Sparkles,
  Filter
} from 'lucide-react';

interface TrackerViewProps {
  trackedItems: ApplicationTrackerItem[];
  scholarships: Scholarship[];
  onUpdateStatus: (scholarshipId: string, status: ApplicationStatus) => void;
  onToggleChecklist: (scholarshipId: string, checklistId: string) => void;
  onRemoveTracked: (scholarshipId: string) => void;
  onSelectScholarship: (scholarship: Scholarship) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  trackedItems,
  scholarships,
  onUpdateStatus,
  onToggleChecklist,
  onRemoveTracked,
  onSelectScholarship,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredItems = trackedItems.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'saved':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Saved</span>;
      case 'in_progress':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">In Progress</span>;
      case 'submitted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">Submitted</span>;
      case 'interview':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">Interview Scheduled</span>;
      case 'awarded':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">Awarded 🎉</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-7 h-7 text-purple-700" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Scholarship Application Tracker
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of application deadlines, checklist documents, and review statuses in one workspace.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'saved', 'in_progress', 'submitted', 'interview', 'awarded'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterStatus === st
                  ? 'bg-purple-700 text-white font-bold shadow'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tracked List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Applications Tracked Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Explore scholarships and click "Save to Tracker" on any grant to start organizing your documents and deadline progress.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => {
            const scholarship = scholarships.find((s) => s.id === item.scholarshipId);
            if (!scholarship) return null;

            const completedTasks = item.checklist.filter((c) => c.completed).length;
            const progressPercent = Math.round((completedTasks / item.checklist.length) * 100);

            return (
              <div
                key={item.scholarshipId}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-purple-700">{scholarship.provider}</span>
                    <h3
                      onClick={() => onSelectScholarship(scholarship)}
                      className="text-lg font-bold text-slate-900 hover:text-purple-700 cursor-pointer"
                    >
                      {scholarship.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {scholarship.amount}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        Deadline: {scholarship.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Select */}
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-400 font-medium hidden sm:inline">Status:</label>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          onUpdateStatus(item.scholarshipId, e.target.value as ApplicationStatus)
                        }
                        className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="saved">Saved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="submitted">Submitted</option>
                        <option value="interview">Interview Scheduled</option>
                        <option value="awarded">Awarded 🎉</option>
                      </select>
                    </div>

                    <button
                      onClick={() => onRemoveTracked(item.scholarshipId)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove from tracker"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">Document Checklist Progress</span>
                    <span className="text-purple-700">{completedTasks} of {item.checklist.length} Completed ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Checklist items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {item.checklist.map((check) => (
                    <button
                      key={check.id}
                      onClick={() => onToggleChecklist(item.scholarshipId, check.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        check.completed
                          ? 'bg-purple-50 text-purple-900 border-purple-200 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="line-clamp-1">{check.label}</span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          check.completed ? 'text-purple-700 fill-purple-200' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <a
                    href={scholarship.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-700 font-bold hover:underline"
                  >
                    <span>Visit Official Application Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onSelectScholarship(scholarship)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                  >
                    View Scholarship Rules
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
