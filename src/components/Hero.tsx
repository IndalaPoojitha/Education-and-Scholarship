import React from 'react';
import { Sparkles, Award, GraduationCap, ShieldCheck, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  onOpenAIMatcher: () => void;
  onSelectQuickTag: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchChange,
  searchValue,
  onOpenAIMatcher,
  onSelectQuickTag,
}) => {
  const quickTags = [
    { label: 'Fully Funded', filter: 'fully_funded' },
    { label: 'STEM & AI', filter: 'STEM (Science, Tech, Eng, Math)' },
    { label: 'Global Students', filter: 'Global / All Countries' },
    { label: 'Master\'s & PhD', filter: 'Graduate / Master\'s' },
    { label: 'Adults & Re-Entry', filter: 'Adult & Re-entry Student' }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white border-b border-purple-900/30">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Empowering Women Higher Education Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Unlock Higher Education & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                Scholarships for Women
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover fully-funded international grants, STEM fellowships, business awards, and re-entry stipends tailored specifically for female scholars. Use our AI-powered eligibility matcher and essay reviewer to craft winning applications.
            </p>

            {/* Search Input Box */}
            <div className="pt-2 max-w-2xl mx-auto lg:mx-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by scholarship title, university, field (e.g. Google, AAUW, STEM)..."
                  className="w-full pl-5 pr-32 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-xl transition-all"
                />
                <button
                  onClick={onOpenAIMatcher}
                  className="absolute right-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">AI Match</span>
                </button>
              </div>

              {/* Quick Filter Tag Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-400">Popular Filters:</span>
                {quickTags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => onSelectQuickTag(tag.filter)}
                    className="px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-purple-900/40 hover:text-purple-200 border border-slate-700/60 transition-all cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges & Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white">$500K+</p>
                <p className="text-xs text-slate-400">Annual Funding Directory</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-400">100%</p>
                <p className="text-xs text-slate-400">Verified Women Grants</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-300">Global</p>
                <p className="text-xs text-slate-400">STEM & Humanities Scope</p>
              </div>
            </div>

          </div>

          {/* Right Hero Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/30 bg-slate-900/80 p-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="/src/assets/images/women_education_hero_1785934335920.jpg"
                  alt="Women students in higher education and STEM research"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Floating Feature Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-purple-500/30 shadow-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Need Application Support?</p>
                    <p className="text-[11px] text-slate-300">Try AI Essay Coach for instant feedback</p>
                  </div>
                </div>
                <button
                  onClick={onOpenAIMatcher}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
