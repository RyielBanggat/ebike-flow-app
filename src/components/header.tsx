'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, BarChart, Gem, QrCode, User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Spinner } from './spinner';

const navLinks = [
  { href: '/', label: 'Renter', icon: Bike },
  { href: '/admin', label: 'Admin', icon: BarChart },
  { href: '/subscriptions', label: 'Plans', icon: Gem },
];

function UserNav() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">
          <LogIn className="mr-2" />
          Login
        </Link>
      </Button>
    )
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => auth.signOut()}>
          <LogOut className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
           <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Bike className="h-7 w-7 text-primary" />
            eBikeFlow
          </Link>
        </div>
        <nav className="flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
            <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Scan to Rent
            </Button>
            <UserNav />
        </div>
      </div>
    </header>
  );
}
