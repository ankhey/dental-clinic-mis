import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
}

const services: Service[] = [
  { id: '1', name: 'Dental Cleaning', price: 3500, category: 'Preventive' },
  { id: '2', name: 'Tooth Extraction', price: 5000, category: 'Surgery' },
  { id: '3', name: 'Filling', price: 4000, category: 'Restorative' },
  { id: '4', name: 'Root Canal', price: 12000, category: 'Endodontics' },
  { id: '5', name: 'Teeth Whitening', price: 8000, category: 'Cosmetic' },
  { id: '6', name: 'Dental Crown', price: 15000, category: 'Restorative' },
  { id: '7', name: 'X-Ray', price: 2000, category: 'Diagnostic' },
  { id: '8', name: 'Consultation', price: 1500, category: 'General' },
];

export const ServiceSelector: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
  };

  const handleSubmit = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    toast.success(`Services allocated successfully! Total: KSh ${calculateTotal().toLocaleString()}`);
    setSelectedServices([]);
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>Select Services</CardTitle>
        <CardDescription>Choose the dental services for this patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">{category}</h3>
            <div className="grid gap-3">
              {services
                .filter(service => service.category === category)
                .map(service => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleToggleService(service.id)}
                      />
                      <label
                        htmlFor={service.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {service.name}
                      </label>
                    </div>
                    <Badge variant="secondary">
                      KSh {service.price.toLocaleString()}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              KSh {calculateTotal().toLocaleString()}
            </span>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full medical-gradient"
            disabled={selectedServices.length === 0}
          >
            Allocate Services ({selectedServices.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
