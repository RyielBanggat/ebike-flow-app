'use client';
import { StatsCards } from '@/components/admin/stats-cards';
import { BikeManagementTable } from '@/components/admin/bike-management-table';
import DemandAnalytics from '@/components/admin/demand-analytics';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Bike, BarChart3, Shield, AlertTriangle } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/components/spinner';


export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }
  
  if (!user) {
    return null;
  }
  
  // TODO: Add proper admin role check
  const isAdmin = true;

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }

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
