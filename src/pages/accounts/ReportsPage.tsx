import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const ReportsPage = () => {
  const handleExportPDF = () => {
    toast.success('Exporting report as PDF...');
  };

  const handleExportExcel = () => {
    toast.success('Exporting report as Excel...');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Financial Reports</h2>
          <p className="text-muted-foreground">Revenue analysis and financial summaries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">KES 2.4M</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cash Payments</p>
                <p className="text-2xl font-bold mt-2">KES 1.5M</p>
                <p className="text-xs text-muted-foreground mt-2">62.5% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Insurance Claims</p>
                <p className="text-2xl font-bold mt-2">KES 900K</p>
                <p className="text-xs text-muted-foreground mt-2">37.5% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Preventive Care</span>
                  <span className="font-bold">KES 800K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Restorative</span>
                  <span className="font-bold">KES 900K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '37.5%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Cosmetic</span>
                  <span className="font-bold">KES 500K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Surgery</span>
                  <span className="font-bold">KES 200K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '8.5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { month: 'January', revenue: 2400000, change: 12.5, up: true },
              { month: 'December', revenue: 2100000, change: 5.2, up: true },
              { month: 'November', revenue: 1950000, change: -3.1, up: false },
            ].map((data) => (
              <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="font-medium">{data.month}</span>
                <div className="flex items-center gap-4">
                  <span className="font-bold">KES {(data.revenue / 1000000).toFixed(1)}M</span>
                  <span className={`text-xs flex items-center gap-1 ${data.up ? 'text-green-600' : 'text-red-600'}`}>
                    {data.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(data.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
