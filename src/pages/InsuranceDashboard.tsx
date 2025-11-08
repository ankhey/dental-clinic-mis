import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ClaimCard } from '@/components/ClaimCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Claim {
  id: string;
  claimNumber: string;
  patientName: string;
  service: string;
  amount: number;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  provider: string;
}

const mockClaims: Claim[] = [
  { id: '1', claimNumber: 'SHA/2025/001', patientName: 'Jane Smith', service: 'Root Canal', amount: 12000, submittedDate: '2025-01-09', status: 'pending', provider: 'Dental Care Clinic' },
  { id: '2', claimNumber: 'SHA/2025/002', patientName: 'David Brown', service: 'Dental Crown', amount: 15000, submittedDate: '2025-01-08', status: 'pending', provider: 'Dental Care Clinic' },
  { id: '3', claimNumber: 'SHA/2025/003', patientName: 'Mary Johnson', service: 'Teeth Whitening', amount: 8000, submittedDate: '2025-01-07', status: 'approved', provider: 'Dental Care Clinic' },
  { id: '4', claimNumber: 'SHA/2025/004', patientName: 'Peter Wilson', service: 'Filling', amount: 4000, submittedDate: '2025-01-06', status: 'rejected', provider: 'Dental Care Clinic' },
];

const InsuranceDashboard = () => {
  const [claims, setClaims] = useState(mockClaims);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    setClaims(prev =>
      prev.map(claim => claim.id === id ? { ...claim, status } : claim)
    );
  };

  const pendingClaims = claims.filter(c => c.status === 'pending');
  const approvedClaims = claims.filter(c => c.status === 'approved');
  const rejectedClaims = claims.filter(c => c.status === 'rejected');

  const stats = [
    { title: 'Total Claims', value: claims.length.toString(), icon: ShieldCheck, color: 'text-primary' },
    { title: 'Pending Review', value: pendingClaims.length.toString(), icon: Clock, color: 'text-accent' },
    { title: 'Approved', value: approvedClaims.length.toString(), icon: CheckCircle, color: 'text-primary' },
    { title: 'Rejected', value: rejectedClaims.length.toString(), icon: XCircle, color: 'text-destructive' },
  ];

  return (
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
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

        {/* Claims Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-card">
            <TabsTrigger value="pending">Pending ({pendingClaims.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedClaims.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedClaims.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingClaims.map(claim => (
                <ClaimCard key={claim.id} claim={claim} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedClaims.map(claim => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectedClaims.map(claim => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

const InsuranceDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<InsuranceHome />} />
        <Route path="claims" element={<ClaimsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default InsuranceDashboard;
