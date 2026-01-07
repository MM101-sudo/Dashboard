
import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';
import { CheckCircle2, Circle, GraduationCap } from 'lucide-react';

const STORAGE_KEY = 'zenfinance_checklist';

const INITIAL_STEPS: ChecklistItem[] = [
  { id: 'step1', text: 'Build a $1,000 "Starter" Emergency Fund', completed: false },
  { id: 'step2', text: 'Capture Employer Retirement Match (e.g. 401k)', completed: false },
  { id: 'step3', text: 'Pay off High-Interest Debt (>7% interest rates)', completed: false },
  { id: 'step4', text: 'Build 3-6 Months of Expenses in Savings', completed: false },
  { id: 'step5', text: 'Contribute to Tax-Advantaged Accounts (IRA/HSA)', completed: false },
  { id: 'step6', text: 'Invest in Broad Market Index Funds (Low Fees)', completed: false },
  { id: 'step7', text: 'Review & Automate Monthly Contributions', completed: false },
];

export const InvestingChecklist: React.FC = () => {
  const [steps, setSteps] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STEPS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  }, [steps]);

  const toggleStep = (id: string) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Investing Checklist</h2>
        <p className="text-sm text-gray-500">The essential order of operations.</p>
      </header>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Financial Maturity</p>
              <p className="text-3xl font-black">{completedCount} / {steps.length}</p>
            </div>
            <GraduationCap className="w-12 h-12 text-white/20" />
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
              step.completed 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800 opacity-75' 
                : 'bg-white border-gray-100 hover:border-indigo-200 text-gray-700'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {step.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-tighter text-gray-400 mb-0.5">Step {index + 1}</span>
              <p className={`font-medium ${step.completed ? 'line-through decoration-emerald-200' : ''}`}>
                {step.text}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center py-4">
        <button 
          onClick={() => setSteps(INITIAL_STEPS)}
          className="text-xs font-bold text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
};
