'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ActiveRentalCard() {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(3580); 

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 3600) { // 1 hour
      toast({
        title: "Hourly Charge Reminder",
        description: "Your first hour is complete. Subsequent hours are charged at ₱50.",
      });
    }
  }, [seconds, toast]);


  if (!isActive) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Start a new ride</CardTitle>
                <CardDescription>Scan a QR code or select a bike to begin.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full">View Nearby Bikes</Button>
            </CardContent>
        </Card>
    );
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const calculateCost = () => {
    if (hours < 1 && minutes < 60) return 120;
    const succeedingHours = Math.ceil((seconds - 3600) / 3600);
    return 120 + (succeedingHours * 50);
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="text-primary animate-pulse" />
          Active Rental
        </CardTitle>
        <CardDescription>Your ride is in progress. Have fun!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-background/70 p-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Time Elapsed</span>
            <span className="text-3xl font-bold font-mono tracking-tighter">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground">Current Cost</span>
            <span className="text-3xl font-bold">₱{calculateCost()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" variant="destructive" onClick={() => setIsActive(false)}>End Ride</Button>
          <Button className="w-full" variant="outline">
            <MapPin className="mr-2 h-4 w-4" /> Find Parking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
