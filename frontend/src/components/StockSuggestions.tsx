import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGoodStocksWithRisk } from '@/services/gemini'; // ✅ Gemini API integration
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StockSuggestions = () => {
  const { data: suggestions = [], isLoading, isError } = useQuery({
    queryKey: ['stock-suggestions'],
    queryFn: fetchGoodStocksWithRisk
  });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading stock suggestions...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load stock suggestions.</p>;
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{suggestion.company_name}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.stock_symbol}</p>
              </div>
              <Badge className={getRiskBadgeColor(suggestion.risk_level)}>
                {suggestion.risk_level} Risk
              </Badge>
            </div>
            <p className="text-sm mb-2">{suggestion.suggestion}</p>
            {suggestion.potential_gain && (
              <p className="text-sm text-green-600">
                Potential Gain: {suggestion.potential_gain}%
              </p>
            )}
          </CardContent>
        </Card>
      ))}
      
      {suggestions.length === 0 && (
        <p className="text-center text-muted-foreground">
          No stock suggestions available
        </p>
      )}
    </div>
  );
};

export default StockSuggestions;
