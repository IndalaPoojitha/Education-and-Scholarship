import React from 'react';
import { GraduationCap, Heart, Sparkles, Award } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenAIMatcher: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAIMatcher }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-purple-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">EduHer Portal</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Dedicated to advancing gender equity in higher education. EduHer empowers female scholars across STEM, Medicine, Business, Humanities, and PhD research with verified international scholarships and AI guidance tools.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3.5 py-1.5 rounded-full inline-flex">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>100% Free & Open Access Platform</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Quick Portal Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('explore')} className="hover:text-purple-300 transition-colors">
                  Scholarship Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('essay-coach')} className="hover:text-purple-300 transition-colors">
                  AI Essay Feedback Coach
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tracker')} className="hover:text-purple-300 transition-colors">
                  My Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('resources')} className="hover:text-purple-300 transition-colors">
                  Guides & Mentorship Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('calculator')} className="hover:text-purple-300 transition-colors">
                  Budget & Gap Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Feature & Impact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">AI Scholarship Matcher</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find scholarships tailored to your exact academic major, country of origin, target institution, and financial need.
            </p>
            <button
              onClick={onOpenAIMatcher}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow transition-all"
            >
              Run AI Matcher
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EduHer Scholarship Portal. Empowering female scholars worldwide.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for women in higher education</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
