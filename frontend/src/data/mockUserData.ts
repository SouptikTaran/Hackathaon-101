// Mock user data
export const mockUser = {
  id: "mock-user-id",
  email: "user@example.com",
};

// Mock expenses
const today = new Date(); // Avoid redundant calls to new Date()
export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 65.75,
    category: "food",
    date: new Date(today.setDate(today.getDate() - 1)).toISOString(),
  },
  {
    id: "2",
    title: "Movie Tickets",
    amount: 25.99,
    category: "entertainment",
    date: new Date(today.setDate(today.getDate() - 2)).toISOString(),
  },
  {
    id: "3",
    title: "Gas",
    amount: 45.50,
    category: "travel",
    date: new Date(today.setDate(today.getDate() - 3)).toISOString(),
  },
  {
    id: "4",
    title: "Internet Bill",
    amount: 79.99,
    category: "bills",
    date: new Date(today.setDate(today.getDate() - 4)).toISOString(),
  },
];

// Mock category limits
export const mockCategoryLimits: CategoryLimit[] = [
  { category: "food", limit: 500, current: 185.25 },
  { category: "travel", limit: 200, current: 64.25 },
  { category: "bills", limit: 300, current: 134.99 },
  { category: "entertainment", limit: 150, current: 25.99 },
  { category: "shopping", limit: 200, current: 89.95 },
  { category: "other", limit: 100, current: 0 },
];

// Mock daily limit
export const mockDailyLimit: DailyLimit = {
  limit: 50,
  current: 78.25,
  date: new Date().toISOString(),
};

// Utility function to get category color
export const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    food: "#F59E0B",
    travel: "#3B82F6",
    bills: "#8B5CF6",
    entertainment: "#EC4899",
    shopping: "#06B6D4",
    other: "#6B7280",
  };

  return categoryColors[category] || categoryColors.other;
};