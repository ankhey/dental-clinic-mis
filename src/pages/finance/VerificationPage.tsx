import { PaymentTable } from '@/components/PaymentTable';

const VerificationPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Payment Verification</h2>
        <p className="text-muted-foreground">Review and verify pending payment transactions</p>
      </div>

      <PaymentTable />
    </div>
  );
};

export default VerificationPage;
