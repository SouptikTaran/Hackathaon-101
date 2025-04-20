import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseChart from '@/components/ExpenseChart';
import { useExpense } from '@/contexts/ExpenseContext';
import TransactionsTable from '@/components/TransactionsTable';
import ServicesOverview from '@/components/ServicesOverview';
import StockSuggestions from '@/components/StockSuggestions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';

const Analytics = () => {
  const { getMonthlyExpenses } = useExpense();
  const monthlyExpenses = getMonthlyExpenses();
  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const [expenseChartData, setExpenseChartData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [expenseRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/recent-expenses'),
          axios.get('http://localhost:3000/api/services'),
        ]);

        console.log('Fetched expense chart data:', expenseRes.data);
        console.log('Fetched services data:', servicesRes.data);

        setExpenseChartData(expenseRes.data);
        setServicesData(servicesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
      <p className="text-gray-600">Gain insights into your spending habits and financial trends.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Total spent this month</p>
            </div>
            {isLoading ? (
              <p className="text-gray-500">Loading chart...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ExpenseChart data={expenseChartData} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services & Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-gray-500">Loading services...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ServicesOverview data={servicesData} />
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="stock-suggestions">Stock Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionsTable data={expenseChartData} />
        </TabsContent>

        <TabsContent value="stock-suggestions" className="space-y-4">
          <StockSuggestions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
