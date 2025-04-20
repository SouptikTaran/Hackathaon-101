import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { getCategoryColor } from '@/data/mockData';

const TransactionsTable = ({ data }) => {
  const sortedExpenses = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedExpenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{format(new Date(expense.date), 'MMM dd, yyyy')}</TableCell>
            <TableCell>{expense.description || expense.title}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor(expense.category) }}
                />
                <span className="capitalize">{expense.category}</span>
              </div>
            </TableCell>
            <TableCell className="font-medium text-right text-green-600">
              ${expense.amount.toFixed(2)}
            </TableCell>
            <TableCell className="capitalize text-sm text-gray-500">
              {expense.source || 'manual'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
