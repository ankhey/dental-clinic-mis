import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const mockRecords = [
  { id: 1, reference: 'QH12XYZ890', amount: 5000, bankAmount: 5000, status: 'matched', date: '2024-01-15' },
  { id: 2, reference: 'QH13ABC123', amount: 3000, bankAmount: 3000, status: 'matched', date: '2024-01-15' },
  { id: 3, reference: 'BK98765432', amount: 15000, bankAmount: 14900, status: 'mismatch', date: '2024-01-14' },
  { id: 4, reference: 'QH14DEF456', amount: 8000, bankAmount: null, status: 'pending', date: '2024-01-14' },
  { id: 5, reference: 'QH15GHI789', amount: 4000, bankAmount: 4000, status: 'matched', date: '2024-01-13' },
];

const ReconciliationPage = () => {
  const [filter, setFilter] = useState<'all' | 'matched' | 'mismatch' | 'pending'>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Matched
          </Badge>
        );
      case 'mismatch':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Mismatch
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredRecords = filter === 'all' 
    ? mockRecords 
    : mockRecords.filter(record => record.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Payment Reconciliation</h2>
        <p className="text-muted-foreground">Match finance records with bank deposits and M-Pesa logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover-lift cursor-pointer" onClick={() => setFilter('all')}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-2xl font-bold mt-1">{mockRecords.length}</p>
          </CardContent>
        </Card>
        <Card className="hover-lift cursor-pointer" onClick={() => setFilter('matched')}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Matched</p>
            <p className="text-2xl font-bold mt-1 text-green-600">
              {mockRecords.filter(r => r.status === 'matched').length}
            </p>
          </CardContent>
        </Card>
        <Card className="hover-lift cursor-pointer" onClick={() => setFilter('mismatch')}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Mismatch</p>
            <p className="text-2xl font-bold mt-1 text-red-600">
              {mockRecords.filter(r => r.status === 'mismatch').length}
            </p>
          </CardContent>
        </Card>
        <Card className="hover-lift cursor-pointer" onClick={() => setFilter('pending')}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">
              {mockRecords.filter(r => r.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reconciliation Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-semibold">{record.reference}</span>
                    {getStatusBadge(record.status)}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Date: {record.date}</span>
                    <span>Finance: KES {record.amount.toLocaleString()}</span>
                    <span>
                      Bank: {record.bankAmount ? `KES ${record.bankAmount.toLocaleString()}` : 'Not found'}
                    </span>
                  </div>
                </div>
                {record.status !== 'matched' && (
                  <Button variant="outline" size="sm">
                    {record.status === 'mismatch' ? 'Investigate' : 'Match Now'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationPage;
