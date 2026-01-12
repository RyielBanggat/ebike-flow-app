'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, BarChart, Gem, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Renter', icon: Bike },
  { href: '/admin', label: 'Admin', icon: BarChart },
  { href: '/subscriptions', label: 'Plans', icon: Gem },
];

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
        <div className="ml-auto flex items-center">
            <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Scan to Rent
            </Button>
        </div>
      </div>
    </header>
  );
}
