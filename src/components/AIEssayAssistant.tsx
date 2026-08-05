import React, { useState } from 'react';
import { EssayReviewResponse, Scholarship } from '../types';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen,
  Award,
  Lightbulb
} from 'lucide-react';

interface AIEssayAssistantProps {
  scholarships: Scholarship[];
  prefilledTitle?: string;
}

export const AIEssayAssistant: React.FC<AIEssayAssistantProps> = ({
  scholarships,
  prefilledTitle = '',
}) => {
  const [scholarshipTitle, setScholarshipTitle] = useState(
    prefilledTitle || 'AAUW International Fellowships for Women'
  );
  const [essayPrompt, setEssayPrompt] = useState(
    'Describe your research or academic passion, leadership experience, and how your studies will advance female empowerment and equality in your field or country.'
  );
  const [essayDraft, setEssayDraft] = useState(
    `Growing up in my hometown, I was one of only three girls in my high school advanced mathematics class. This experience taught me early on the barriers women face in STEM education. Throughout my undergraduate degree in Computer Science, I maintained a 3.8 GPA while founding a weekend coding mentorship initiative for 30 high school girls. 

Receiving this scholarship will allow me to pursue my Master's degree without taking on crippling loan debt. With this degree, I aim to develop educational AI software that adapts to bandwidth-constrained environments in rural schools, ensuring young girls receive quality STEM tutoring regardless of location. My long-term goal is to return as a university professor to mentor the next generation of female technological leaders.`
  );
  const [targetWordCount, setTargetWordCount] = useState('500 words');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<EssayReviewResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRunFeedback = async () => {
    if (!essayDraft.trim() || essayDraft.length < 20) {
      setErrorMsg('Please enter a substantive draft essay before reviewing.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/essay-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scholarshipTitle,
          essayPrompt,
          essayDraft,
          targetWordCount,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate essay feedback.');
      }

      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      } else {
        throw new Error('Invalid feedback response received from server.');
      }
    } catch (err: any) {
      console.error('Essay Review Error:', err);
      setErrorMsg(err.message || 'An error occurred during review.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySample = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Powered Scholarship Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            AI Scholarship Essay & Personal Statement Coach
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Elevate your scholarship application. Paste your draft personal statement or essay prompt to receive instant AI analysis on tone, structural clarity, leadership narrative, and gender equity impact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Application Draft Editor</span>
          </h2>

          {/* Select Scholarship */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
              Target Scholarship
            </label>
            <select
              value={scholarshipTitle}
              onChange={(e) => setScholarshipTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="AAUW International Fellowships for Women">AAUW International Fellowships for Women</option>
              <option value="Google Women Techmakers Scholars Program">Google Women Techmakers Scholars Program</option>
              <option value="Schlumberger Faculty for the Future Fellowships">Schlumberger Faculty for the Future Fellowships</option>
              <option value="Adobe Research Women-in-Technology Scholarship">Adobe Research Women-in-Technology Scholarship</option>
              <option value="Society of Women Engineers (SWE) Annual Scholarships">Society of Women Engineers (SWE) Scholarships</option>
              <option value="General Women in Leadership & Higher Education Grant">General Women in Leadership Grant</option>
            </select>
          </div>

          {/* Essay Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
              Essay Prompt / Question
            </label>
            <input
              type="text"
              value={essayPrompt}
              onChange={(e) => setEssayPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter the official essay prompt question..."
            />
          </div>

          {/* Word Count */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
              Target Word Count Limit
            </label>
            <input
              type="text"
              value={targetWordCount}
              onChange={(e) => setTargetWordCount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="e.g. 500 words or 2 pages"
            />
          </div>

          {/* Essay Draft Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                Your Draft Essay Text
              </label>
              <span className="text-[11px] font-semibold text-slate-400">
                Word Count: ~{essayDraft.trim() ? essayDraft.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <textarea
              rows={12}
              value={essayDraft}
              onChange={(e) => setEssayDraft(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-purple-500 focus:outline-none font-sans"
              placeholder="Paste or write your essay draft here..."
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleRunFeedback}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Reviewing Essay with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-white" />
                <span>Analyze Essay & Get Feedback</span>
              </>
            )}
          </button>

        </div>

        {/* Right Column: AI Feedback Analysis */}
        <div className="lg:col-span-6 space-y-6">
          
          {!feedback ? (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ready for AI Essay Review</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Click "Analyze Essay & Get Feedback" on the left to evaluate your draft against scholarship committee standards, tone, leadership impact, and gender equity goals.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Score & Tone Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Overall Impact Score</span>
                    <p className="text-3xl font-extrabold text-slate-900">{feedback.overallScore} <span className="text-slate-400 text-base">/ 100</span></p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tone & Voice</span>
                    <p className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full mt-1">
                      {feedback.toneAnalysis}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 rounded-full transition-all duration-1000"
                    style={{ width: `${feedback.overallScore}%` }}
                  />
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths Identified</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {feedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Areas for Refinement</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {feedback.areasForImprovement.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Leadership & Women Empowerment Advice */}
              <div className="bg-purple-900 text-white p-6 rounded-3xl shadow-lg space-y-3">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Elevating Leadership & Gender Impact</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-purple-100">
                  {feedback.leadershipAndImpactSuggestions.map((sug, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">→</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Polished Sample Snippet */}
              {feedback.polishedSnippetSample && (
                <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Polished Opening / Sample Rewrite
                    </span>
                    <button
                      onClick={() => handleCopySample(feedback.polishedSnippetSample)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    "{feedback.polishedSnippetSample}"
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
