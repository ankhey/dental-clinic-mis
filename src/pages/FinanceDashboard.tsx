import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { PaymentTable } from '@/components/PaymentTable';
import PaymentsPage from './finance/PaymentsPage';
import VerificationPage from './finance/VerificationPage';

const FinanceHome = () => {
  const stats = [
    { title: 'Total Payments', value: 'KSh 342,500', icon: DollarSign, color: 'text-primary' },
    { title: 'Verified Today', value: '42', icon: CheckCircle, color: 'text-primary' },
    { title: 'Pending Verification', value: '8', icon: Clock, color: 'text-accent' },
    { title: 'Revenue Growth', value: '+12.5%', icon: TrendingUp, color: 'text-primary' },
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
      <PaymentTable />
    </div>
  );
};

const FinanceDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<FinanceHome />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="verification" element={<VerificationPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default FinanceDashboard;
