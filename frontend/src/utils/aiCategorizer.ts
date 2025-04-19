
import { ExpenseCategory } from "../types";
import { supabase } from '@/lib/supabase';

// Keywords for each category to help with basic categorization
const categoryKeywords: Record<ExpenseCategory, string[]> = {
  food: ["grocery", "restaurant", "cafe", "pizza", "food", "coffee", "bakery", "meal", "diner", "lunch"],
  travel: ["gas", "uber", "lyft", "taxi", "flight", "hotel", "motel", "airbnb", "train", "bus", "car rental"],
  bills: ["utility", "water", "electricity", "gas bill", "phone", "internet", "insurance", "rent", "mortgage"],
  entertainment: ["movie", "netflix", "spotify", "disney", "hbo", "cinema", "concert", "theater", "game"],
  shopping: ["amazon", "walmart", "target", "clothing", "shoes", "electronics", "furniture", "mall"],
  other: []
};

// Local fallback categorization for offline support
function localCategorizeExpense(title: string, amount: number): ExpenseCategory {
  title = title.toLowerCase();
  
  // Check if the title matches any keywords for each category
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => title.includes(keyword))) {
      return category as ExpenseCategory;
    }
  }
  
  // Simple heuristics for common expenses
  if (amount < 15 && (title.includes("coffee") || title.includes("cafe"))) {
    return "food";
  }
  
  if (amount > 100 && amount < 300 && title.includes("store")) {
    return "shopping";
  }
  
  if (title.includes("subscription") || (amount < 20 && amount > 5 && /monthly|weekly|annual/.test(title))) {
    return "entertainment";
  }
  
  return "other";
}

// Main function that tries to use the Edge Function first, then falls back to local categorization
export async function categorizeExpense(title: string, amount: number): Promise<ExpenseCategory> {
  try {
    // Try to use the Edge Function for AI-powered categorization
    const { data, error } = await supabase.functions.invoke('categorize-expense', {
      body: { title, amount }
    });
    
    if (error) throw error;
    
    if (data && data.category) {
      return data.category as ExpenseCategory;
    }
    
    // Fall back to local categorization if edge function doesn't return expected data
    return localCategorizeExpense(title, amount);
  } catch (error) {
    console.error('Error using AI categorization:', error);
    // Fall back to local categorization if the edge function fails
    return localCategorizeExpense(title, amount);
  }
}
