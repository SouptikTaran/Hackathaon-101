import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

const ServicesOverview = ({ data = [] }) => {
  console.log('Services Overview Data:', data);

  return (
    <div className="space-y-4">
      {data.map((service) => (
        <Card key={service.id}>
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-muted-foreground">
                Renews: {format(new Date(service.renewal_date), 'MMM dd, yyyy')}
              </p>
            </div>
            <p className="font-semibold">${service.cost.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <p className="text-center text-muted-foreground">No active subscriptions</p>
      )}
    </div>
  );
};

export default ServicesOverview;
