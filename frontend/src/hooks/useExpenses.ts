import { useState, useEffect } from "react";
import { fetchExpenses, addExpense, deleteExpense } from "@/services/apiService";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      setExpenses((prev) => [...prev, newExpense]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return { expenses, loading, createExpense, removeExpense };
};
