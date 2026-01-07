
import React, { useState, useEffect } from 'react';
import { SavingsData } from '../types';
import { Trophy, TrendingUp, CircleDollarSign } from 'lucide-react';

const STORAGE_KEY = 'zenfinance_savings';

export const SavingsTracker: React.FC = () => {
  const [savings, setSavings] = useState<SavingsData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { goal: 0, current: 0 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savings));
  }, [savings]);

  const progress = savings.goal > 0 ? (savings.current / savings.goal) * 100 : 0;
  const remaining = Math.max(0, savings.goal - savings.current);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSavings(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Savings Tracker</h2>
        <p className="text-sm text-gray-500">Visualize your path to financial freedom.</p>
      </header>

      <section className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm transition-all">
            <label className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
              <Trophy className="w-4 h-4" /> Your Goal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
              <input
                type="number"
                name="goal"
                value={savings.goal || ''}
                onChange={handleInputChange}
                placeholder="Target Amount"
                className="w-full pl-8 pr-4 py-3 bg-indigo-50/30 rounded-xl text-2xl font-bold text-gray-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-sm">
            <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              <TrendingUp className="w-4 h-4" /> Amount Saved
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
              <input
                type="number"
                name="current"
                value={savings.current || ''}
                onChange={handleInputChange}
                placeholder="Current Balance"
                className="w-full pl-8 pr-4 py-3 bg-emerald-50/30 rounded-xl text-2xl font-bold text-gray-800 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 text-center">
            <span className="text-4xl font-black text-white">{progress.toFixed(1)}%</span>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-1">Completion</p>
          </div>

          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-8 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 w-full gap-4 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Remaining</p>
              <p className="text-lg font-bold">${remaining.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Milestone</p>
              <p className="text-lg font-bold">{progress >= 100 ? 'Goal Met!' : 'On Track'}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {[1000, 5000, 10000, 25000].map(val => (
          <button
            key={val}
            onClick={() => setSavings(prev => ({ ...prev, goal: val }))}
            className="shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-full transition-colors"
          >
            ${val.toLocaleString()} Goal
          </button>
        ))}
      </div>
    </div>
  );
};
