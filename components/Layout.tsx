
import React from 'react';
import { Screen } from '../types';
import { 
  PieChart, 
  Target, 
  CheckSquare, 
  GitBranch,
  Wallet,
  BookOpen
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNav: (screen: Screen) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNav }) => {
  const navItems = [
    { id: Screen.BUDGET, icon: PieChart, label: 'Budget' },
    { id: Screen.SAVINGS, icon: Target, label: 'Savings' },
    { id: Screen.CHECKLIST, icon: CheckSquare, label: 'Invest' },
    { id: Screen.FLOWCHART, icon: GitBranch, label: 'Flow' },
    { id: Screen.RESOURCES, icon: BookOpen, label: 'Links' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-white shadow-xl relative pb-20">
      {/* Header */}
      <header className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">Money Mindset Dashboard</h1>
        </div>
        <div className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">Local Only</div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 flex-1 ${
                isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
