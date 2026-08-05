import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const BudgetCalculator: React.FC = () => {
  // Expense inputs
  const [tuition, setTuition] = useState<number>(25000);
  const [living, setLiving] = useState<number>(12000);
  const [books, setBooks] = useState<number>(1500);
  const [travel, setTravel] = useState<number>(2000);
  const [childcare, setChildcare] = useState<number>(0);

  // Income / Funding inputs
  const [awardedScholarships, setAwardedScholarships] = useState<number>(15000);
  const [savings, setSavings] = useState<number>(5000);
  const [partTimeIncome, setPartTimeIncome] = useState<number>(3000);

  const totalExpenses = tuition + living + books + travel + childcare;
  const totalFunding = awardedScholarships + savings + partTimeIncome;
  const netFundingGap = totalExpenses - totalFunding;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-300" />
            <span>Higher Education Financial Planner</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Education Cost & Scholarship Gap Calculator
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Estimate your annual higher education costs against awarded grants and savings to calculate your net funding gap.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Expenses Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-red-600" />
                <span>Estimated Annual Education Expenses</span>
              </span>
              <span className="text-xs font-extrabold text-slate-900 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                ${totalExpenses.toLocaleString()} / year
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tuition & University Fees ($)</label>
                <input
                  type="number"
                  value={tuition}
                  onChange={(e) => setTuition(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Living Expenses & Housing ($)</label>
                <input
                  type="number"
                  value={living}
                  onChange={(e) => setLiving(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Books, Tech & Lab Supplies ($)</label>
                <input
                  type="number"
                  value={books}
                  onChange={(e) => setBooks(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Travel & Visa Relocation ($)</label>
                <input
                  type="number"
                  value={travel}
                  onChange={(e) => setTravel(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Childcare / Family Support (If applicable) ($)</label>
                <input
                  type="number"
                  value={childcare}
                  onChange={(e) => setChildcare(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Funding Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Secured Funding & Income</span>
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                ${totalFunding.toLocaleString()} / year
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Awarded Grants & Scholarships ($)</label>
                <input
                  type="number"
                  value={awardedScholarships}
                  onChange={(e) => setAwardedScholarships(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Personal Savings / Family Aid ($)</label>
                <input
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Part-Time Work / Teaching Assistantship ($)</label>
                <input
                  type="number"
                  value={partTimeIncome}
                  onChange={(e) => setPartTimeIncome(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calculation Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 border border-slate-800">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Financial Overview</span>
              <h2 className="text-xl font-extrabold text-white mt-1">Annual Budget Analysis</h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm border-b border-slate-800 pb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Education Expense:</span>
                <span className="font-bold text-red-400">${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Secured Scholarships & Income:</span>
                <span className="font-bold text-emerald-400">${totalFunding.toLocaleString()}</span>
              </div>
            </div>

            {/* Gap Outcome Box */}
            <div className={`p-5 rounded-2xl border ${
              netFundingGap > 0 
                ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' 
                : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
            }`}>
              <span className="text-[11px] font-bold uppercase tracking-wide">
                {netFundingGap > 0 ? 'Remaining Annual Funding Gap' : 'Funding Surplus / Covered'}
              </span>
              <p className="text-3xl font-extrabold mt-1 text-white">
                ${Math.abs(netFundingGap).toLocaleString()}
              </p>
              <p className="text-xs mt-2 opacity-90 leading-relaxed">
                {netFundingGap > 0 
                  ? 'You need additional scholarship or grant funding to cover full tuition & living costs.'
                  : 'Great news! Your secured funding covers your estimated expenses for the academic year.'}
              </p>
            </div>

            {/* Recommendations */}
            {netFundingGap > 0 && (
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Recommended Next Steps:</span>
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Apply for secondary partial grants (e.g. Margaret McNamara or SWE Awards)</li>
                  <li>Check if your university offers Graduate Research or Teaching Assistantships (GRA/GTA)</li>
                  <li>Inquire with university international student services regarding emergency tuition subsidies</li>
                </ul>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
