import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const PaymentsPage = () => {
  const [paymentData, setPaymentData] = useState({
    reference: '',
    amount: '',
    phone: '',
    serviceId: '',
    paymentType: 'mpesa'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment recorded successfully!');
    setPaymentData({ reference: '', amount: '', phone: '', serviceId: '', paymentType: 'mpesa' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Record Payment</h2>
        <p className="text-muted-foreground">Input payment details for verification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select
                  value={paymentData.paymentType}
                  onValueChange={(value) => setPaymentData({ ...paymentData, paymentType: value })}
                >
                  <SelectTrigger id="paymentType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank">Bank Deposit</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reference">Payment Reference</Label>
                <Input
                  id="reference"
                  value={paymentData.reference}
                  onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                  placeholder={paymentData.paymentType === 'mpesa' ? 'e.g., QH12XYZ890' : 'e.g., BK12345678'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Patient Phone Number</Label>
                <Input
                  id="phone"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                  placeholder="+254712345678"
                  required
                />
              </div>

              <div>
                <Label htmlFor="serviceId">Service ID</Label>
                <Input
                  id="serviceId"
                  value={paymentData.serviceId}
                  onChange={(e) => setPaymentData({ ...paymentData, serviceId: e.target.value })}
                  placeholder="e.g., SVC001"
                  required
                />
              </div>

              <Button type="submit" className="w-full medical-gradient">
                Submit Payment
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">QH12XYZ{890 + i}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">KES {(5000 * i).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">+254712345678</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsPage;
