import { Timestamp } from "firebase/firestore";

export type Bike = {
  id: string;
  status: 'available' | 'rented' | 'locked';
  location?: string;
  battery: number;
  qrCode: string;
  stationId: string;
  lockStatus: boolean;
};

export type Station = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  parkingBayIds: string[];
  bikeCount?: number; // This might be dynamically calculated
};

export type Subscription = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular: boolean;
};

export type UserProfile = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    loyaltyPoints?: number;
    createdAt: Timestamp;
}


// Mock data is no longer the primary source, but can be kept for fallback or testing.
export const bikes: Bike[] = [
  { id: 'EB-001', status: 'available', location: 'SM Lanang', battery: 95, qrCode: 'qr-001', stationId: 'station-01', lockStatus: false },
  { id: 'EB-002', status: 'rented', location: 'On Ride', battery: 78, qrCode: 'qr-002', stationId: 'station-01', lockStatus: false },
  { id: 'EB-003', status: 'available', location: 'Gaisano Mall', battery: 88, qrCode: 'qr-003', stationId: 'station-02', lockStatus: false },
  { id: 'EB-004', status: 'locked', location: 'SM Ecoland', battery: 45, qrCode: 'qr-004', stationId: 'station-03', lockStatus: true },
  { id: 'EB-005', status: 'available', location: 'SM Lanang', battery: 100, qrCode: 'qr-005', stationId: 'station-01', lockStatus: false },
  { id: 'EB-006', status: 'available', location: 'Ateneo de Davao', battery: 91, qrCode: 'qr-006', stationId: 'station-04', lockStatus: false },
  { id: 'EB-007', status: 'rented', location: 'On Ride', battery: 62, qrCode: 'qr-007', stationId: 'station-02', lockStatus: false },
  { id: 'EB-008', status: 'available', location: 'Gaisano Mall', battery: 99, qrCode: 'qr-008', stationId: 'station-02', lockStatus: false },
];

export const stations: Station[] = [
  { id: 'station-01', name: 'SM Lanang Premier', location: { lat: 7.1033, lng: 125.6325 }, bikeCount: 12, parkingBayIds: [] },
  { id: 'station-02', name: 'Gaisano Mall of Davao', location: { lat: 7.0815, lng: 125.6120 }, bikeCount: 8, parkingBayIds: [] },
  { id: 'station-03', name: 'SM City Davao (Ecoland)', location: { lat: 7.0494, lng: 125.5925 }, bikeCount: 15, parkingBayIds: [] },
  { id: 'station-04', name: 'Ateneo de Davao University', location: { lat: 7.0717, lng: 125.6094 }, bikeCount: 10, parkingBayIds: [] },
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
