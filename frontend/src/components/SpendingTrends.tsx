import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingTrends: React.FC<{ data: { date: string; amount: number }[] }> = ({ data }) => {

  // Format the data for the chart
  const chartData = data.map((item) => ({
    name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    amount: item.amount,
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
          <XAxis dataKey="name" stroke="#888" fontSize={12} />
          <YAxis 
            stroke="#888" 
            fontSize={12} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4FD1C5"
            strokeWidth={2}
            dot={{ stroke: '#4FD1C5', strokeWidth: 2, fill: '#4FD1C5' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrends;
