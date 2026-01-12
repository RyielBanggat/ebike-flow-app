export type Bike = {
  id: string;
  status: 'available' | 'rented' | 'locked';
  location: string;
  battery: number;
};

export type Station = {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  bikeCount: number;
};

export type Subscription = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular: boolean;
};

export const bikes: Bike[] = [
  { id: 'EB-001', status: 'available', location: 'SM Lanang', battery: 95 },
  { id: 'EB-002', status: 'rented', location: 'On Ride', battery: 78 },
  { id: 'EB-003', status: 'available', location: 'Gaisano Mall', battery: 88 },
  { id: 'EB-004', status: 'locked', location: 'SM Ecoland', battery: 45 },
  { id: 'EB-005', status: 'available', location: 'SM Lanang', battery: 100 },
  { id: 'EB-006', status: 'available', location: 'Ateneo de Davao', battery: 91 },
  { id: 'EB-007', status: 'rented', location: 'On Ride', battery: 62 },
  { id: 'EB-008', status: 'available', location: 'Gaisano Mall', battery: 99 },
];

export const stations: Station[] = [
  { id: 1, name: 'SM Lanang Premier', location: { lat: 7.1033, lng: 125.6325 }, bikeCount: 12 },
  { id: 2, name: 'Gaisano Mall of Davao', location: { lat: 7.0815, lng: 125.6120 }, bikeCount: 8 },
  { id: 3, name: 'SM City Davao (Ecoland)', location: { lat: 7.0494, lng: 125.5925 }, bikeCount: 15 },
  { id: 4, name: 'Ateneo de Davao University', location: { lat: 7.0717, lng: 125.6094 }, bikeCount: 10 },
];

export const subscriptions: Subscription[] = [
  {
    id: 'daily',
    name: 'Daily Pass',
    price: 299,
    duration: '/ day',
    features: ['Unlimited 30-min rides', 'Ride anytime', 'No unlock fees'],
    isPopular: false,
  },
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: 999,
    duration: '/ week',
    features: ['Unlimited 45-min rides', 'Priority bike access', '24/7 support'],
    isPopular: true,
  },
  {
    id: 'monthly',
    name: 'Monthly Pass',
    price: 2499,
    duration: '/ month',
    features: ['Unlimited 60-min rides', 'Exclusive discounts', 'Guest passes'],
    isPopular: false,
  },
];
