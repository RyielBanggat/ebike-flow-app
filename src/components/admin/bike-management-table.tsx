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
import { bikes } from "@/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const statusStyles = {
    available: 'default',
    rented: 'secondary',
    locked: 'destructive',
} as const;

export function BikeManagementTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bike ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Battery</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bikes.map((bike) => (
                        <TableRow key={bike.id}>
                            <TableCell className="font-medium">{bike.id}</TableCell>
                            <TableCell>
                                <Badge variant={statusStyles[bike.status]} className="capitalize">{bike.status}</Badge>
                            </TableCell>
                            <TableCell>{bike.battery}%</TableCell>
                            <TableCell>{bike.location}</TableCell>
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
                                        <DropdownMenuItem>
                                            <Lock className="mr-2 h-4 w-4" />
                                            Manual Lock
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Unlock className="mr-2 h-4 w-4" />
                                            Manual Unlock
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
