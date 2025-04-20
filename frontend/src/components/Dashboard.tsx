import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DailyLimitProgress from '@/components/DailyLimitProgress';
import ExpenseChart from '@/components/ExpenseChart';
import RecentExpensesList from '@/components/RecentExpensesList';
import CategoryLimitCard from '@/components/CategoryLimitCard';
import ExpenseForm from '@/components/ExpenseForm';
import SpendingTrends from '@/components/SpendingTrends';
import { useExpense } from '@/contexts/ExpenseContext';
import { cn } from '@/lib/utils';
import ImportTransactions from '@/components/ImportTransactions';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { isLoading } = useExpense();
  const [categoryLimits, setCategoryLimits] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [spendingTrends, setSpendingTrends] = useState([]);
  const [expenseChartData, setExpenseChartData] = useState([]);
  const [dailyLimitData, setDailyLimitData] = useState({ spent: 0, limit: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryLimitsRes, recentExpensesRes, spendingTrendsRes, expenseChartRes, dailyLimitRes] = await Promise.all([
          axios.get('http://localhost:3000/api/category-limits'),
          axios.get('http://localhost:3000/api/recent-expenses'),
          axios.get('http://localhost:3000/api/spending-trends'),
          axios.get('http://localhost:3000/api/expense-chart'),
          axios.get('http://localhost:3000/api/daily-limit'),
        ]);

        setCategoryLimits(categoryLimitsRes.data);
        setRecentExpenses(recentExpensesRes.data);
        setSpendingTrends(spendingTrendsRes.data);
        setExpenseChartData(expenseChartRes.data);
        setDailyLimitData(dailyLimitRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Budget Dashboard</h2>
        <div className="flex gap-2">
          <ImportTransactions />
          <ExpenseForm />
        </div>
      </div>
      
      {isLoading ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-1 lg:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-36" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="expenses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-4">
              <Skeleton className="h-64 w-full" />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Daily Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <DailyLimitProgress data={dailyLimitData} />
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-1 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Spending Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </CardHeader>
              <CardContent>
                <SpendingTrends data={spendingTrends} />
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="expenses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-4">
              <RecentExpensesList data={recentExpenses} />
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {categoryLimits.map(cl => (
                  <CategoryLimitCard key={cl.category} categoryLimit={cl} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpenseChart data={expenseChartData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
