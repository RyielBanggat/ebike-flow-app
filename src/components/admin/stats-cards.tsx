import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, PlayCircle, Lock, CheckCircle } from "lucide-react";
import { bikes } from "@/lib/data";

const stats = [
    { title: "Total E-Bikes", value: bikes.length, icon: Bike, color: "text-blue-500" },
    { title: "Active Rentals", value: bikes.filter(b => b.status === 'rented').length, icon: PlayCircle, color: "text-orange-500" },
    { title: "Locked Units", value: bikes.filter(b => b.status === 'locked').length, icon: Lock, color: "text-red-500" },
    { title: "Available Units", value: bikes.filter(b => b.status === 'available').length, icon: CheckCircle, color: "text-green-500" },
];

export function StatsCards() {
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
