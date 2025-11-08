import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Activity, CreditCard, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Services', value: '3,456', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Payments', value: 'KES 2.4M', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Pending Claims', value: '89', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const portals = [
    { name: 'Cashier Portal', path: '/cashier', icon: Users, description: 'Patient registration & services' },
    { name: 'Finance Portal', path: '/finance', icon: CreditCard, description: 'Payment processing & verification' },
    { name: 'Accounts Portal', path: '/accounts', icon: TrendingUp, description: 'Reports & reconciliation' },
    { name: 'Insurance Portal', path: '/insurance', icon: ShieldCheck, description: 'Claims management' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clinic Operations Manager</h1>
          <p className="text-muted-foreground mt-2">Overview of all departmental activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Portals */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access to Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((portal) => (
              <Card key={portal.name} className="hover-lift group cursor-pointer" onClick={() => navigate(portal.path)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <portal.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{portal.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{portal.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Department Activity Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Department Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">New patient registered</p>
                    <p className="text-sm text-muted-foreground">Cashier - 5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/cashier/patients')}>View</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Payment verified - KES 15,000</p>
                    <p className="text-sm text-muted-foreground">Finance - 12 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/finance/verification')}>View</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Insurance claim approved</p>
                    <p className="text-sm text-muted-foreground">Insurance - 28 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/insurance/claims')}>View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComDashboard;
