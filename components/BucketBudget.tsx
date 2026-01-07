
import React, { useState, useEffect } from 'react';
import { BudgetData } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Info } from 'lucide-react';

const STORAGE_KEY = 'zenfinance_budget';
const IDEAL_RATIOS = { essentials: 0.5, future: 0.2, fun: 0.3 };

export const BucketBudget: React.FC = () => {
  const [budget, setBudget] = useState<BudgetData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { essentials: 0, future: 0, fun: 0 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
  }, [budget]);

  const total = budget.essentials + budget.future + budget.fun;
  const getPercentage = (val: number) => (total > 0 ? (val / total) * 100 : 0);

  const data = [
    { name: 'Essentials', value: budget.essentials || 0.0001, color: '#6366f1' },
    { name: 'Future', value: budget.future || 0.0001, color: '#10b981' },
    { name: 'Fun', value: budget.fun || 0.0001, color: '#f59e0b' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudget(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const Comparison = ({ label, current, ideal, color }: { label: string, current: number, ideal: number, color: string }) => {
    const diff = current - (ideal * 100);
    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs font-medium uppercase tracking-tighter">
          <span className="text-gray-500">{label}</span>
          <span style={{ color }}>{current.toFixed(0)}%</span>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500" 
            style={{ width: `${current}%`, backgroundColor: color }}
          />
        </div>
        <span className={`text-[10px] ${Math.abs(diff) < 2 ? 'text-gray-400' : diff > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
          {Math.abs(diff) < 2 ? 'Ideal balance' : `${diff > 0 ? '+' : ''}${diff.toFixed(0)}% from target`}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-4">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">3-Bucket Budget</h2>
        <p className="text-sm text-gray-500 mb-6 italic">The simple 50/30/20 guideline.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'essentials', label: 'Essentials', color: 'border-indigo-500', note: 'Rent, bills, food' },
            { id: 'future', label: 'Future', color: 'border-emerald-500', note: 'Savings, debt, invest' },
            { id: 'fun', label: 'Fun', color: 'border-amber-500', note: 'Hobby, eating out, travel' }
          ].map(field => (
            <div key={field.id} className="relative group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input
                  type="number"
                  name={field.id}
                  value={budget[field.id as keyof BudgetData] || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 bg-gray-50 border-2 ${field.color} rounded-xl text-2xl font-bold text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all`}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{field.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Visual Breakdown</h3>
          <div className="text-sm font-bold text-indigo-600">
            Total: ${total.toLocaleString()}
          </div>
        </div>

        <div className="h-48 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <Comparison label="Essentials" current={getPercentage(budget.essentials)} ideal={IDEAL_RATIOS.essentials} color="#6366f1" />
          <Comparison label="Future" current={getPercentage(budget.future)} ideal={IDEAL_RATIOS.future} color="#10b981" />
          <Comparison label="Fun" current={getPercentage(budget.fun)} ideal={IDEAL_RATIOS.fun} color="#f59e0b" />
        </div>
      </section>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-700 leading-relaxed">
          <strong>The 50/30/20 Rule:</strong> Aim for 50% on Essentials, 30% on Fun, and 20% on your Future. Adjust based on your current life stage and priorities.
        </p>
      </div>
    </div>
  );
};
