import { Expense, CategoryLimit, DailyLimit } from "../types";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 65.75,
    category: "food",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: "2",
    title: "Movie Tickets",
    amount: 25.99,
    category: "entertainment",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: "3",
    title: "Gas",
    amount: 45.50,
    category: "travel",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
  },
  {
    id: "4",
    title: "Internet Bill",
    amount: 79.99,
    category: "bills",
    date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
  },
  {
    id: "5",
    title: "New Shoes",
    amount: 89.95,
    category: "shopping",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: "6",
    title: "Coffee",
    amount: 4.50,
    category: "food",
    date: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Mobile Bill",
    amount: 55.00,
    category: "bills",
    date: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Uber",
    amount: 18.75,
    category: "travel",
    date: new Date().toISOString(),
  },
];

export const mockCategoryLimits: CategoryLimit[] = [
  { category: "Food", limit: 500, current: 185.25 },
  { category: "Travel", limit: 200, current: 64.25 },
  { category: "Bills", limit: 300, current: 134.99 },
  { category: "Entertainment", limit: 150, current: 25.99 },
  { category: "Shopping", limit: 200, current: 89.95 },
  { category: "Other", limit: 100, current: 0 },
];

export const mockDailyLimit: DailyLimit = {
  limit: 50,
  current: 78.25,
  date: new Date().toISOString(),
};

export const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    Food: '#F59E0B',
    Travel: '#3B82F6',
    Bills: '#8B5CF6',
    Entertainment: '#EC4899',
    Shopping: '#06B6D4',
    Other: '#6B7280',
  };
  
  return categoryColors[category] || categoryColors.other;
};

export const mockServices = [
  {
    id: "1",
    name: "Netflix",
    cost: 15.99,
    renewal_date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
  },
  {
    id: "2",
    name: "Spotify",
    cost: 9.99,
    renewal_date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
  },
  {
    id: "3",
    name: "Amazon Prime",
    cost: 12.99,
    renewal_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
  },
  {
    id: "4",
    name: "Disney+",
    cost: 7.99,
    renewal_date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
  },
];

export const mockStockSuggestions = [
  {
    id: 1,
    company_name: "TechCorp Inc.",
    stock_symbol: "TCI",
    risk_level: "High",
    suggestion: "Consider investing for short-term gains.",
    potential_gain: 15,
    created_at: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: 2,
    company_name: "GreenEnergy Ltd.",
    stock_symbol: "GEL",
    risk_level: "Medium",
    suggestion: "Good for long-term investment.",
    potential_gain: 10,
    created_at: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  {
    id: 3,
    company_name: "RetailMart",
    stock_symbol: "RM",
    risk_level: "Low",
    suggestion: "Stable stock with consistent returns.",
    potential_gain: 5,
    created_at: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  },
];
