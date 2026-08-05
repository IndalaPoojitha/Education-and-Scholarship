import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookmarkCheck, 
  FileText, 
  BookOpen, 
  Calculator, 
  Search, 
  Menu, 
  X,
  Heart,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenAIMatcher: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenAIMatcher,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Scholarships', icon: Award },
    { id: 'essay-coach', label: 'AI Essay Coach', icon: FileText, badge: 'AI' },
    { id: 'tracker', label: 'My Tracker', icon: BookmarkCheck, count: savedCount },
    { id: 'resources', label: 'Guides & Mentors', icon: BookOpen },
    { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-purple-900/30 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('explore')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-400 group-hover:rotate-6 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                  EduHer
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  Women's Education
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Scholarship Portal & AI Guidance
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-amber-400 text-slate-950 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-pink-500/30 text-pink-300 rounded-full border border-pink-500/40">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* AI Matcher CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAIMatcher}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-pink-500/20 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 fill-slate-950 animate-pulse" />
              <span>AI Eligibility Matcher</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAIMatcher}
              className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm"
              title="AI Matcher"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-5 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-amber-400 text-slate-950 rounded-full">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-pink-500 text-white rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenAIMatcher();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-slate-950 font-bold text-sm shadow-md"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>Launch AI Eligibility Matcher</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
