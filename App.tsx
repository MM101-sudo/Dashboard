
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { BucketBudget } from './components/BucketBudget';
import { SavingsTracker } from './components/SavingsTracker';
import { InvestingChecklist } from './components/InvestingChecklist';
import { MoneyFlowchart } from './components/MoneyFlowchart';
import { Resources } from './components/Resources';
import { Screen } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.BUDGET);

  // Initialize Screen from hash if available
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Screen;
    if (Object.values(Screen).includes(hash)) {
      setActiveScreen(hash);
    }
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.BUDGET:
        return <BucketBudget />;
      case Screen.SAVINGS:
        return <SavingsTracker />;
      case Screen.CHECKLIST:
        return <InvestingChecklist />;
      case Screen.FLOWCHART:
        return <MoneyFlowchart />;
      case Screen.RESOURCES:
        return <Resources />;
      default:
        return <BucketBudget />;
    }
  };

  const handleNav = (screen: Screen) => {
    setActiveScreen(screen);
    window.location.hash = screen;
  };

  return (
    <Layout activeScreen={activeScreen} onNav={handleNav}>
      {renderScreen()}
    </Layout>
  );
};

export default App;
