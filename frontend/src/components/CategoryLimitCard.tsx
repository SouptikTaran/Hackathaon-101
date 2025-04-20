import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExpense } from '@/contexts/ExpenseContext';
import { CategoryLimit } from '@/types';
import { getCategoryColor } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CategoryLimitCardProps {
  categoryLimit: CategoryLimit;
}

const CategoryLimitCard: React.FC<CategoryLimitCardProps> = ({ categoryLimit }) => {
  const { category, limit, spent } = categoryLimit;

  const safeLimit = limit ?? 0;
  const safeCurrent = spent ?? 0;

  const percentage = safeLimit > 0 ? Math.min((safeCurrent / safeLimit) * 100, 100) : 0;
  const isOverLimit = safeCurrent > safeLimit;
  const categoryColor = getCategoryColor(category);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>{categoryName}</span>
          <span className={isOverLimit ? "text-expense" : ""}>
            ${safeCurrent.toFixed(0)} / ${safeLimit}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={percentage} 
          className="h-2"
          style={{
            backgroundColor: `${categoryColor}20`,
          }}
        />
        {isOverLimit && (
          <p className="text-xs text-expense mt-1">
            ${(safeCurrent - safeLimit).toFixed(2)} over budget
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryLimitCard;
