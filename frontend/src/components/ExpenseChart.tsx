import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getCategoryColor } from '@/data/mockData';

const ExpenseChart: React.FC<{ data: { category: string; amount: number ;  }[] }> = ({ data }) => {

  // Format the data for the chart
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    color: getCategoryColor(item.category),
  }));

  // Don't render if there's no data
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] bg-secondary/30 rounded-lg">
        <p className="text-muted-foreground">No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
