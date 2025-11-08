import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Activity } from 'lucide-react';
import { toast } from 'sonner';

const mockServices = [
  { id: 1, name: 'Tooth Extraction', category: 'Surgery', price: 5000 },
  { id: 2, name: 'Dental Cleaning', category: 'Preventive', price: 3000 },
  { id: 3, name: 'Root Canal', category: 'Endodontics', price: 15000 },
  { id: 4, name: 'Teeth Whitening', category: 'Cosmetic', price: 8000 },
  { id: 5, name: 'Dental Filling', category: 'Restorative', price: 4000 },
  { id: 6, name: 'Dental Crown', category: 'Restorative', price: 12000 },
];

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({ name: '', category: '', price: '' });

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegisterService = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Service registered successfully!');
    setNewService({ name: '', category: '', price: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Services Management</h2>
          <p className="text-muted-foreground">Manage available dental services and pricing</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="medical-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Register Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegisterService} className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g., Tooth Extraction"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  placeholder="e.g., Surgery"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (KES)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              <Button type="submit" className="w-full medical-gradient">Register Service</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-2xl font-bold text-primary">KES {service.price.toLocaleString()}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3">Edit Service</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;
