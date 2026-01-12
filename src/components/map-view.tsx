'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Card } from './ui/card';

type Station = {
  id: number;
  name: string;
  location: { lat: number; lng: number };
};

export function MapView({ stations }: { stations: Station[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className="flex h-[600px] w-full items-center justify-center rounded-lg border bg-muted text-center p-4">
        <div>
          <p className="font-bold">Cannot Display Map</p>
          <p className="text-sm text-muted-foreground">The Google Maps API Key is missing. Please add it to your environment variables.</p>
        </div>
      </Card>
    );
  }

  const davaoCityCenter = { lat: 7.0722, lng: 125.6131 };

  return (
    <Card className="h-[600px] w-full rounded-lg overflow-hidden border shadow-md">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={davaoCityCenter}
          defaultZoom={13}
          mapId="ebikeflow-map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          className="h-full w-full"
        >
          {stations.map(station => (
            <AdvancedMarker key={station.id} position={station.location} title={station.name}>
                <Pin background={'hsl(var(--primary))'} glyphColor={'hsl(var(--primary-foreground))'} borderColor={'hsl(var(--primary))'} />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </Card>
  );
}
