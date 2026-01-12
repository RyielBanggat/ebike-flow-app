'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, PlayCircle, Lock, CheckCircle } from "lucide-react";
import { useCollection, useFirestore } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { Bike as BikeType } from "@/lib/data";
import { Skeleton } from "../ui/skeleton";


export function StatsCards() {
    const firestore = useFirestore();
    const bikesCollection = collection(firestore, 'ebikes');
    const { data: bikes, isLoading } = useCollection<BikeType>(bikesCollection);

    const totalBikes = bikes?.length ?? 0;
    const rentedBikes = bikes?.filter(b => b.status === 'rented').length ?? 0;
    const lockedBikes = bikes?.filter(b => b.status === 'locked').length ?? 0;
    const availableBikes = bikes?.filter(b => b.status === 'available').length ?? 0;

    const stats = [
        { title: "Total E-Bikes", value: totalBikes, icon: Bike, color: "text-blue-500" },
        { title: "Active Rentals", value: rentedBikes, icon: PlayCircle, color: "text-orange-500" },
        { title: "Locked Units", value: lockedBikes, icon: Lock, color: "text-red-500" },
        { title: "Available Units", value: availableBikes, icon: CheckCircle, color: "text-green-500" },
    ];
    
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({length: 4}).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-7 w-12" />
                           <Skeleton className="h-3 w-28 mt-1" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">units in the system</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
