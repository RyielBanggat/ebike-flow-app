'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Lock, Unlock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore } from "@/firebase";
import { collection, doc } from 'firebase/firestore';
import type { Bike } from "@/lib/data";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Skeleton } from "../ui/skeleton";

const statusStyles = {
    available: 'default',
    rented: 'secondary',
    locked: 'destructive',
} as const;

export function BikeManagementTable() {
    const firestore = useFirestore();
    const bikesCollection = collection(firestore, 'ebikes');
    const { data: bikes, isLoading } = useCollection<Bike>(bikesCollection);

    const handleLockToggle = (bike: Bike) => {
        const bikeRef = doc(firestore, 'ebikes', bike.id);
        const newLockStatus = !bike.lockStatus;
        const newStatus = newLockStatus ? 'locked' : 'available';

        // We only allow locking/unlocking if bike is not currently rented
        if (bike.status !== 'rented') {
             updateDocumentNonBlocking(bikeRef, { lockStatus: newLockStatus, status: newStatus });
        }
    };


    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bike ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Battery</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Lock Status</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && Array.from({length: 5}).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                            <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                        </TableRow>
                    ))}
                    {!isLoading && bikes?.map((bike) => (
                        <TableRow key={bike.id}>
                            <TableCell className="font-medium">{bike.id}</TableCell>
                            <TableCell>
                                <Badge variant={statusStyles[bike.status]} className="capitalize">{bike.status}</Badge>
                            </TableCell>
                            <TableCell>{bike.battery}%</TableCell>
                            <TableCell>{bike.location ?? 'N/A'}</TableCell>
                             <TableCell>
                                <Badge variant={bike.lockStatus ? 'destructive' : 'default'}>
                                    {bike.lockStatus ? 'Locked' : 'Unlocked'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleLockToggle(bike)} disabled={bike.status === 'rented'}>
                                            {bike.lockStatus ? <Unlock className="mr-2 h-4 w-4" /> : <Lock className="mr-2 h-4 w-4" />}
                                            {bike.lockStatus ? 'Manual Unlock' : 'Manual Lock'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
