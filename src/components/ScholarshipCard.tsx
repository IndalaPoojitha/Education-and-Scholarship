import React from 'react';
import { Scholarship, MatchResult } from '../types';
import { Award, Calendar, Globe, Bookmark, BookmarkCheck, CheckCircle, Sparkles, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (scholarship: Scholarship) => void;
  matchResult?: MatchResult;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  isSaved,
  onToggleSave,
  onSelect,
  matchResult,
}) => {
  // Check if deadline is approaching (e.g. within 60 days)
  const isClosingSoon = () => {
    const deadlineTime = new Date(scholarship.deadlineDate).getTime();
    const nowTime = new Date().getTime();
    const diffDays = (deadlineTime - nowTime) / (1000 * 3600 * 24);
    return diffDays > 0 && diffDays <= 90;
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 group-hover:h-2 transition-all duration-300" />

      <div className="p-6 space-y-4 flex-1">
        
        {/* Header: Badges & Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Fully Funded Badge */}
            {scholarship.isFullyFunded && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Fully Funded
              </span>
            )}

            {/* Match Badge if available */}
            {matchResult && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {matchResult.matchPercentage}% Match
              </span>
            )}

            {/* Closing Soon Pill */}
            {isClosingSoon() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                Closing Soon
              </span>
            )}

          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(scholarship.id);
            }}
            className={`p-2 rounded-xl transition-all duration-200 ${
              isSaved
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save scholarship'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 fill-purple-700 text-purple-700" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Provider Name */}
        <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
          {scholarship.provider}
        </p>

        {/* Scholarship Title */}
        <h3 
          onClick={() => onSelect(scholarship)}
          className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {scholarship.title}
        </h3>

        {/* Amount & Target Audience */}
        <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100/80 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Award Amount</p>
            <p className="text-base font-extrabold text-slate-900">{scholarship.amount}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Application Fee</p>
            <p className="text-xs font-bold text-emerald-700">{scholarship.applicationFee}</p>
          </div>
        </div>

        {/* Description Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Tags / Levels */}
        <div className="pt-1 flex flex-wrap gap-1.5">
          {scholarship.level.slice(0, 2).map((lvl) => (
            <span
              key={lvl}
              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
            >
              {lvl}
            </span>
          ))}
          {scholarship.field.slice(0, 1).map((fld) => (
            <span
              key={fld}
              className="px-2 py-0.5 rounded-md bg-purple-100/60 text-purple-800 text-[11px] font-medium"
            >
              {fld}
            </span>
          ))}
        </div>

      </div>

      {/* Footer Details: Deadline & View Action */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>Deadline: <strong className="text-slate-800">{scholarship.deadline}</strong></span>
        </div>

        <button
          onClick={() => onSelect(scholarship)}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition-all shadow-sm group-hover:shadow-md"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
