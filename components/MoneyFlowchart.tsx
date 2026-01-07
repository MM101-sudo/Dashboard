
import React, { useState } from 'react';
import { ArrowRight, RefreshCw, Milestone, ChevronRight } from 'lucide-react';

// Node interface for the flowchart steps
interface Node {
  id: string;
  // Make question optional for leaf nodes
  question?: string;
  yesId?: string;
  noId?: string;
  finalMessage?: string;
  action?: string;
}

const FLOW_DATA: Record<string, Node> = {
  start: {
    id: 'start',
    question: 'Is your monthly budget balanced? (Earnings > Expenses)',
    yesId: 'emergency_starter',
    noId: 'fix_budget'
  },
  fix_budget: {
    id: 'fix_budget',
    finalMessage: 'Priority #1: Financial Stability',
    action: 'Reduce non-essential spending or increase income until you have a surplus.'
  },
  emergency_starter: {
    id: 'emergency_starter',
    question: 'Do you have $1,000 saved for immediate emergencies?',
    yesId: 'high_interest_debt',
    noId: 'save_starter'
  },
  save_starter: {
    id: 'save_starter',
    finalMessage: 'Save Your Starter Fund',
    action: 'Stop all investing and extra debt payments until you have $1,000 in cash.'
  },
  high_interest_debt: {
    id: 'high_interest_debt',
    question: 'Do you have debt with >7% interest (Credit cards, etc.)?',
    yesId: 'pay_debt',
    noId: 'employer_match'
  },
  pay_debt: {
    id: 'pay_debt',
    finalMessage: 'Kill High-Interest Debt',
    action: 'Use the "Debt Avalanche" or "Snowball" method to clear high-interest balances.'
  },
  employer_match: {
    id: 'employer_match',
    question: 'Does your employer offer a 401k/Retirement match?',
    yesId: 'check_match_contributed',
    noId: 'full_ef'
  },
  check_match_contributed: {
    id: 'check_match_contributed',
    question: 'Are you contributing enough to get the FULL match?',
    yesId: 'full_ef',
    noId: 'get_match'
  },
  get_match: {
    id: 'get_match',
    finalMessage: 'Don\'t Leave Money on the Table',
    action: 'Contribute exactly enough to maximize the match. It\'s a 100% instant return.'
  },
  full_ef: {
    id: 'full_ef',
    question: 'Do you have 3-6 months of expenses saved?',
    yesId: 'retirement_goals',
    noId: 'save_full_ef'
  },
  save_full_ef: {
    id: 'save_full_ef',
    finalMessage: 'Finish Your Safety Net',
    action: 'Aggressively save until your 3-6 month emergency fund is fully funded.'
  },
  retirement_goals: {
    id: 'retirement_goals',
    finalMessage: 'Long-term Investing Phase',
    action: 'Max out Roth IRA / HSA, then increase 401k contributions. Invest in index funds.'
  }
};

export const MoneyFlowchart: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);

  const node = FLOW_DATA[currentNodeId];

  const handleChoice = (nextId: string) => {
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const reset = () => {
    setCurrentNodeId('start');
    setHistory([]);
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Money Flowchart</h2>
        <p className="text-sm text-gray-500">The "Prime Directive" decision tool.</p>
      </header>

      <div className="relative min-h-[400px] flex flex-col items-center justify-center p-4 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
        
        {/* Step Indicator */}
        <div className="absolute top-6 left-6 flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Milestone className="w-3 h-3" /> Step {history.length + 1}
        </div>

        {/* Node Content */}
        <div className="w-full max-w-sm text-center animate-in fade-in zoom-in duration-500">
          {node.question ? (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-800 leading-tight">
                {node.question}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleChoice(node.yesId!)}
                  className="py-4 bg-white border-2 border-emerald-500 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-sm"
                >
                  YES
                </button>
                <button
                  onClick={() => handleChoice(node.noId!)}
                  className="py-4 bg-white border-2 border-rose-500 text-rose-600 font-bold rounded-2xl hover:bg-rose-50 transition-all shadow-sm"
                >
                  NO
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                <ArrowRight className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  {node.finalMessage}
                </h3>
                <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  {node.action}
                </p>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-xl"
              >
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
            </div>
          )}
        </div>

        {/* History / Back Button */}
        {history.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            <p className="w-full text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">History</p>
            {history.map((hId, idx) => (
              <div key={idx} className="flex items-center gap-1 opacity-50">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                {idx < history.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300" />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
        <p className="text-[10px] text-amber-700 font-medium italic text-center leading-normal">
          Disclaimer: This flowchart is for educational purposes and follows general financial principles. Consult with a qualified professional for personalized advice.
        </p>
      </div>
    </div>
  );
};
