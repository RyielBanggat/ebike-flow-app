import type {Metadata} from 'next';
import { Inter } from 'next/font/google'
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'eBikeFlow',
  description: 'Urban E-Bike Rental Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
