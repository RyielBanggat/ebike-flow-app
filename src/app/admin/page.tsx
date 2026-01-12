import { StatsCards } from '@/components/admin/stats-cards';
import { BikeManagementTable } from '@/components/admin/bike-management-table';
import DemandAnalytics from '@/components/admin/demand-analytics';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Bike, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of your eBikeFlow operations.</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bike />
                E-Bike Fleet Management
              </CardTitle>
              <CardDescription>View and manage all e-bikes in your fleet.</CardDescription>
            </CardHeader>
            <CardContent>
              <BikeManagementTable />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 />
                High-Demand Analytics
              </CardTitle>
              <CardDescription>AI-powered insights to optimize bike deployment.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemandAnalytics />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
