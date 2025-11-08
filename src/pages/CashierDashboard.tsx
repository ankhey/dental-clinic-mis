import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, DollarSign, Clock } from 'lucide-react';
import { PatientForm } from '@/components/PatientForm';
import { ServiceSelector } from '@/components/ServiceSelector';
import PatientsPage from './cashier/PatientsPage';
import ServicesPage from './cashier/ServicesPage';

const CashierHome = () => {
  const stats = [
    { title: 'Patients Today', value: '24', icon: Users, color: 'text-primary' },
    { title: 'Services Allocated', value: '18', icon: Activity, color: 'text-accent' },
    { title: 'Total Revenue', value: 'KSh 156,000', icon: DollarSign, color: 'text-primary' },
    { title: 'Avg Wait Time', value: '15 min', icon: Clock, color: 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-gradient hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientForm />
        <ServiceSelector />
      </div>
    </div>
  );
};

const CashierDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<CashierHome />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="services" element={<ServicesPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CashierDashboard;
