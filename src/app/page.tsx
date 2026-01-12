import { MapView } from '@/components/map-view';
import { stations, bikes } from '@/lib/data';
import { BikeCard } from '@/components/bike-card';
import { ActiveRentalCard } from '@/components/active-rental-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RenterPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <MapView stations={stations} />
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
                  {bikes.map(bike => (
                    <BikeCard key={bike.id} bike={bike} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
