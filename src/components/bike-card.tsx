import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, MapPin } from "lucide-react";
import type { Bike } from "@/lib/data";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const statusStyles = {
    available: {
        badge: 'default',
        text: 'text-green-600',
        label: 'Available'
    },
    rented: {
        badge: 'secondary',
        text: 'text-orange-600',
        label: 'Rented'
    },
    locked: {
        badge: 'destructive',
        text: 'text-red-600',
        label: 'Locked'
    }
} as const;


export function BikeCard({ bike }: { bike: Bike }) {
    const style = statusStyles[bike.status];
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{bike.id}</CardTitle>
                <Badge variant={style.badge} className="capitalize">{style.label}</Badge>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {bike.location}
                    </div>
                    <div className="flex items-center font-medium">
                        <Zap className="mr-1 h-4 w-4 text-green-500" />
                        {bike.battery}%
                    </div>
                </div>
                <Button className="w-full" disabled={bike.status !== 'available'}>Rent Now</Button>
            </CardContent>
        </Card>
    )
}
