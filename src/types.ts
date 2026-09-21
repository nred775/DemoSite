export type ServiceType =
  | 'Pressure Washing'
  | 'Window Cleaning'
  | 'Gutter Cleaning'
  | 'Deck & Patio Cleaning';

export type PropertyType = 'Residential' | 'Commercial';

export type RequestStatus =
  | 'New'
  | 'Contacted'
  | 'Quoted'
  | 'In Progress'
  | 'Completed'
  | 'Closed';

export type Timeframe =
  | 'Within 1-2 weeks'
  | 'Within a month'
  | 'Flexible / No rush'
  | 'Urgent / Next available';

export interface QuoteRequest {
  id: string;
  referenceNumber: string;
  createdAt: string; // ISO string
  serviceType: ServiceType;
  propertyType: PropertyType;
  projectSize: string;
  timeframe: string;
  description: string;
  customerName: string;
  email: string;
  phone?: string;
  zipCode: string;
  status: RequestStatus;
  internalNotes?: string;
  followUpDate?: string;
  isSample?: boolean;
}

export type PageView =
  | 'home'
  | 'services'
  | 'work'
  | 'about'
  | 'quote'
  | 'dashboard';
