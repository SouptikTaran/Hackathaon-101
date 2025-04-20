import React from "react";
import { useExpenses } from "@/hooks/useExpenses";

const Expenses = () => {
  const { expenses, loading, createExpense, removeExpense } = useExpenses();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - ${expense.amount}
            <button onClick={() => removeExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          createExpense({ title: "New Expense", amount: 100, category: "other" })
        }
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
