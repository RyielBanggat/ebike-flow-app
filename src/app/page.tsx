'use client';
import { MapView } from '@/components/map-view';
import { BikeCard } from '@/components/bike-card';
import { ActiveRentalCard } from '@/components/active-rental-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Bike, Station } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

function RenterPageContent() {
  const firestore = useFirestore();
  
  const stationsCollection = useMemoFirebase(() => collection(firestore, 'stations'), [firestore]);
  const { data: stations, isLoading: stationsLoading } = useCollection<Station>(stationsCollection);
  
  const bikesCollection = useMemoFirebase(() => collection(firestore, 'ebikes'), [firestore]);
  const { data: bikes, isLoading: bikesLoading } = useCollection<Bike>(bikesCollection);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <MapView stations={stations ?? []} isLoading={stationsLoading} />
        </div>
        <div className="flex flex-col gap-6">
          <ActiveRentalCard />
          <Card>
            <CardHeader>
              <CardTitle>Nearby Bikes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {bikesLoading && Array.from({ length: 4 }).map((_, i) => <BikeCardSkeleton key={i} />)}
                  {!bikesLoading && bikes?.map(bike => (
                    <BikeCard key={bike.id} bike={bike} />
                  ))}
                  {!bikesLoading && !bikes?.length && <p className="text-muted-foreground">No bikes available right now.</p>}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


function BikeCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default function RenterPage() {
  return <RenterPageContent />;
}
