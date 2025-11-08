import { ClaimCard } from '@/components/ClaimCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockClaims = [
  { id: 'CLM001', patient: 'John Kamau', amount: 5000, service: 'Tooth Extraction', status: 'pending' as const, date: '2024-01-15' },
  { id: 'CLM002', patient: 'Mary Wanjiru', amount: 15000, service: 'Root Canal', status: 'pending' as const, date: '2024-01-14' },
  { id: 'CLM003', patient: 'Peter Omondi', amount: 3000, service: 'Dental Cleaning', status: 'approved' as const, date: '2024-01-13' },
  { id: 'CLM004', patient: 'Jane Akinyi', amount: 8000, service: 'Teeth Whitening', status: 'approved' as const, date: '2024-01-12' },
  { id: 'CLM005', patient: 'David Mwangi', amount: 12000, service: 'Dental Crown', status: 'rejected' as const, date: '2024-01-11' },
];

const ClaimsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Insurance Claims Management</h2>
        <p className="text-muted-foreground">Review and process insurance claim requests</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({mockClaims.filter(c => c.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({mockClaims.filter(c => c.status === 'approved').length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({mockClaims.filter(c => c.status === 'rejected').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {mockClaims
            .filter(claim => claim.status === 'pending')
            .map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {mockClaims
            .filter(claim => claim.status === 'approved')
            .map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {mockClaims
            .filter(claim => claim.status === 'rejected')
            .map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClaimsPage;
