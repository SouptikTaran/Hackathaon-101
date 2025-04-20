import React from 'react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

interface DailyLimitProgressProps {
  data: {
    spent: number;
    limit: number;
  };
}

const DailyLimitProgress: React.FC<DailyLimitProgressProps> = ({ data }) => {
  const { spent, limit } = data;

  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverLimit = spent > limit;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Daily Spending</p>
        <p className="text-sm font-medium">
          ${spent.toFixed(2)} / ${limit.toFixed(2)}
        </p>
      </div>
      <Progress 
        value={percentage} 
        className={cn('h-2', isOverLimit ? 'bg-red-900/20' : 'bg-blue-900/20')}
      />
      {isOverLimit && (
        <p className="text-xs text-expense animate-fade-in">
          You're ${(spent - limit).toFixed(2)} over your daily limit
        </p>
      )}
    </div>
  );
};

export default DailyLimitProgress;
