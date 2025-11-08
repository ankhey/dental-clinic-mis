import { Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import ReportsPage from './accounts/ReportsPage';
import ReconciliationPage from './accounts/ReconciliationPage';

const AccountsHome = () => {
  const stats = [
    { title: 'Total Revenue', value: 'KSh 1,245,000', icon: DollarSign, color: 'text-primary' },
    { title: 'Monthly Growth', value: '+18.2%', icon: TrendingUp, color: 'text-primary' },
    { title: 'Reports Generated', value: '12', icon: FileText, color: 'text-accent' },
    { title: 'Reconciled', value: '98.5%', icon: PieChart, color: 'text-primary' },
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
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Financial Reports & Reconciliation</CardTitle>
          <CardDescription>Manage ledgers and insurance claim reconciliation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Accounts Dashboard</p>
            <p className="text-sm">Detailed reconciliation and reporting features coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AccountsDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<AccountsHome />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reconciliation" element={<ReconciliationPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AccountsDashboard;
