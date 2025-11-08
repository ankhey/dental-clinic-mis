import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, User, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

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

interface ClaimCardProps {
  claim: Claim;
  onStatusChange?: (id: string, status: 'approved' | 'rejected') => void;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onStatusChange }) => {
  const handleApprove = () => {
    onStatusChange?.(claim.id, 'approved');
    toast.success(`Claim ${claim.claimNumber} approved`);
  };

  const handleReject = () => {
    onStatusChange?.(claim.id, 'rejected');
    toast.error(`Claim ${claim.claimNumber} rejected`);
  };

  const getStatusBadge = () => {
    switch (claim.status) {
      case 'approved':
        return <Badge className="bg-primary text-primary-foreground"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
    }
  };

  return (
    <Card className="card-gradient hover-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Claim #{claim.claimNumber}</CardTitle>
            <CardDescription className="mt-1">{claim.provider}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Patient</p>
              <p className="font-medium">{claim.patientName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Submitted</p>
              <p className="font-medium">{claim.submittedDate}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Service</p>
          <p className="font-medium">{claim.service}</p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Claim Amount</p>
            <p className="text-xl font-bold text-primary">KSh {claim.amount.toLocaleString()}</p>
          </div>
        </div>

        {claim.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleApprove}
              className="flex-1 medical-gradient"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
