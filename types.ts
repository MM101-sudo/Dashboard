
export interface BudgetData {
  essentials: number;
  future: number;
  fun: number;
}

export interface SavingsData {
  goal: number;
  current: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export enum Screen {
  BUDGET = 'budget',
  SAVINGS = 'savings',
  CHECKLIST = 'checklist',
  FLOWCHART = 'flowchart',
  RESOURCES = 'resources'
}
