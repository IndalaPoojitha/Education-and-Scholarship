import React, { useState } from 'react';
import { EDUCATIONAL_GUIDES, MENTORSHIP_PROGRAMS, WOMEN_EDUCATION_STATS } from '../data/resources';
import { EducationalGuide, MentorshipProgram } from '../types';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export const EducationResources: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<EducationalGuide>(EDUCATIONAL_GUIDES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Women Education Hub & Growth Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Guides, Mentorship Networks & Research
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Free educational strategy guides, international mentorship programs, and research insights designed to support female scholars at every phase of higher education.
          </p>
        </div>
      </div>

      {/* Global Impact Stats */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-700" />
          <span>The Power of Educating Women</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WOMEN_EDUCATION_STATS.map((st, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-purple-300 transition-all"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                {st.metric}
              </p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {st.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides & Articles Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-700" />
          <span>Scholarship & Academic Application Guides</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Guide Selection List */}
          <div className="lg:col-span-5 space-y-3">
            {EDUCATIONAL_GUIDES.map((guide) => {
              const isSelected = selectedGuide.id === guide.id;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-900 text-white border-purple-800 shadow-md'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isSelected ? 'text-amber-300' : 'text-purple-700'}>
                      {guide.category}
                    </span>
                    <span className={`flex items-center gap-1 ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug">{guide.title}</h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {guide.excerpt}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Guide Content Reader */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-purple-700 tracking-wider">
                {selectedGuide.category} • {selectedGuide.readTime}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {selectedGuide.title}
              </h2>
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 space-y-2">
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Key Strategy Takeaways</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {selectedGuide.keyTakeaways.map((kt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-700 font-bold">•</span>
                    <span>{kt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
              {selectedGuide.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Mentorship Program Directory */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-700" />
              <span>Global Women Mentorship & Academic Circles</span>
            </h2>
            <p className="text-xs text-slate-500">Connect with female senior scientists, executives, and university mentors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENTORSHIP_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 uppercase">{prog.organization}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {prog.locationType}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{prog.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {prog.tags.map((tg) => (
                    <span key={tg} className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[11px] font-medium">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Duration: {prog.duration}</span>
                <a
                  href={prog.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn & Apply</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
