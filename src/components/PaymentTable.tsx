import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: string;
  patientName: string;
  service: string;
  amount: number;
  method: 'cash' | 'mpesa' | 'insurance';
  reference: string;
  status: 'pending' | 'verified' | 'rejected';
  date: string;
}

const mockPayments: Payment[] = [
  { id: '1', patientName: 'John Doe', service: 'Dental Cleaning', amount: 3500, method: 'mpesa', reference: 'RBK7H8L9M2', status: 'pending', date: '2025-01-10' },
  { id: '2', patientName: 'Jane Smith', service: 'Root Canal', amount: 12000, method: 'insurance', reference: 'SHA/2025/001', status: 'verified', date: '2025-01-09' },
  { id: '3', patientName: 'Mike Johnson', service: 'Filling', amount: 4000, method: 'cash', reference: 'CASH-001', status: 'verified', date: '2025-01-09' },
  { id: '4', patientName: 'Sarah Williams', service: 'Teeth Whitening', amount: 8000, method: 'mpesa', reference: 'RBK9M3N4P5', status: 'pending', date: '2025-01-10' },
  { id: '5', patientName: 'David Brown', service: 'Dental Crown', amount: 15000, method: 'insurance', reference: 'SHA/2025/002', status: 'rejected', date: '2025-01-08' },
];

export const PaymentTable: React.FC = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerify = (id: string) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === id ? { ...payment, status: 'verified' as const } : payment
      )
    );
    toast.success('Payment verified successfully');
  };

  const handleReject = (id: string) => {
    setPayments(prev =>
      prev.map(payment =>
        payment.id === id ? { ...payment, status: 'rejected' as const } : payment
      )
    );
    toast.error('Payment rejected');
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-primary text-primary-foreground"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const getMethodBadge = (method: Payment['method']) => {
    const variants = {
      cash: 'default',
      mpesa: 'secondary',
      insurance: 'outline',
    };
    return <Badge variant={variants[method] as any}>{method.toUpperCase()}</Badge>;
  };

  const filteredPayments = payments.filter(payment =>
    payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="card-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Verification</CardTitle>
            <CardDescription>Review and verify payment transactions</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.patientName}</TableCell>
                  <TableCell>{payment.service}</TableCell>
                  <TableCell className="font-semibold">KSh {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{getMethodBadge(payment.method)}</TableCell>
                  <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="text-right">
                    {payment.status === 'pending' && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerify(payment.id)}
                          className="h-8"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(payment.id)}
                          className="h-8"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
