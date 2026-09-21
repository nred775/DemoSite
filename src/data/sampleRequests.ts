import { QuoteRequest } from '../types';

export const INITIAL_SAMPLE_REQUESTS: QuoteRequest[] = [
  {
    id: 'req-001',
    referenceNumber: 'LPC-8104',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    serviceType: 'Pressure Washing',
    propertyType: 'Residential',
    projectSize: 'Two-story home (~2,600 sq ft)',
    timeframe: 'Within 1-2 weeks',
    description:
      'North-facing vinyl siding has noticeable green algae buildup from spring rains, plus our front concrete walkway and 2-car driveway need a thorough wash before graduation weekend.',
    customerName: 'Marcus Vance',
    email: 'marcus.vance.demo@example.com',
    phone: '(616) 555-0142',
    zipCode: '49423', // Holland, MI
    status: 'New',
    internalNotes:
      'High priority inquiry. Customer mentioned an upcoming event. Check water access on north side.',
    followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isSample: true,
  },
  {
    id: 'req-002',
    referenceNumber: 'LPC-8092',
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
    serviceType: 'Window Cleaning',
    propertyType: 'Residential',
    projectSize: 'Single-story lake cottage (~1,800 sq ft, ~22 panes)',
    timeframe: 'Within a month',
    description:
      'Looking for interior and exterior window cleaning including screens and sliders facing Lake Michigan. Salt and pollen haze have built up over winter.',
    customerName: 'Elena Rostova',
    email: 'elena.rostova.demo@example.com',
    phone: '(269) 555-0189',
    zipCode: '49453', // Saugatuck, MI
    status: 'Contacted',
    internalNotes:
      'Left voicemail on 09/19. Mentioned pure water pole system for high cathedral window over living room.',
    followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isSample: true,
  },
  {
    id: 'req-003',
    referenceNumber: 'LPC-8085',
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // Yesterday
    serviceType: 'Deck & Patio Cleaning',
    propertyType: 'Residential',
    projectSize: 'Split-level cedar deck (~450 sq ft) + flagstone patio',
    timeframe: 'Within 1-2 weeks',
    description:
      'Cedar deck has weathered gray and has some slippery mildew in shaded corners. We plan to stain next month so we need a gentle wash that will not gouge the wood.',
    customerName: 'David & Sarah Chen',
    email: 'chen.family.demo@example.com',
    phone: '(616) 555-0215',
    zipCode: '49503', // Grand Rapids, MI
    status: 'Quoted',
    internalNotes:
      'Sent soft-wash treatment quote $380 on 09/19. Recommended 48-hour dry time before their stain application.',
    followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isSample: true,
  },
  {
    id: 'req-004',
    referenceNumber: 'LPC-8071',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    serviceType: 'Gutter Cleaning',
    propertyType: 'Residential',
    projectSize: 'Two-story colonial home (~3,100 sq ft)',
    timeframe: 'Urgent / Next available',
    description:
      'Pine needles and oak leaves from heavy storm causing back corner downspout to overflow onto foundation. Need full perimeter clean and downspout flush.',
    customerName: 'Thomas Miller',
    email: 't.miller.demo@example.com',
    phone: '(231) 555-0177',
    zipCode: '49441', // Muskegon, MI
    status: 'In Progress',
    internalNotes:
      'Technician scheduled for inspection and cleanout tomorrow 9:30 AM. Gutter guards present on south side only.',
    followUpDate: new Date().toISOString().split('T')[0],
    isSample: true,
  },
  {
    id: 'req-005',
    referenceNumber: 'LPC-8060',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    serviceType: 'Pressure Washing',
    propertyType: 'Commercial',
    projectSize: 'Storefront sidewalk and brick facade (~1,200 sq ft)',
    timeframe: 'Flexible / No rush',
    description:
      'Boutique retail shop in downtown strip. Chewing gum and winter grime on entryway concrete, plus light washing on front brick facade. Needs to be done before business hours (prior to 8:30 AM).',
    customerName: 'Claire Abernathy',
    email: 'claire@harborboutique.demo',
    phone: '(616) 555-0391',
    zipCode: '49417', // Grand Haven, MI
    status: 'Completed',
    internalNotes:
      'Completed early Sunday morning wash. Commercial hot water surface cleaner used. Customer was very satisfied with gum removal.',
    isSample: true,
  },
  {
    id: 'req-006',
    referenceNumber: 'LPC-8048',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    serviceType: 'Window Cleaning',
    propertyType: 'Commercial',
    projectSize: 'Two-story office building (approx 36 exterior panes)',
    timeframe: 'Within a month',
    description:
      'Quarterly maintenance contract inquiry for local professional services office. Focus is exterior glass cleaning twice per year, spring and autumn.',
    customerName: 'Robert Sterling',
    email: 'rsterling.demo@example.com',
    phone: '(616) 555-0811',
    zipCode: '49546', // Cascade / Grand Rapids, MI
    status: 'Quoted',
    internalNotes:
      'Sent bi-annual maintenance contract proposal ($640/yr). Awaiting board approval at end-of-month meeting.',
    followUpDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isSample: true,
  },
  {
    id: 'req-007',
    referenceNumber: 'LPC-8032',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    serviceType: 'Gutter Cleaning',
    propertyType: 'Residential',
    projectSize: 'Ranch style home with detached garage (~2,200 sq ft)',
    timeframe: 'Within 1-2 weeks',
    description:
      'Routine seasonal cleanout. Multiple maple trees surrounding house. Need underground drain extensions checked as well.',
    customerName: 'Hannah Lindquist',
    email: 'hlindquist.demo@example.com',
    zipCode: '49684', // Traverse City, MI
    status: 'Completed',
    internalNotes:
      'Cleaned and flushed all four downspouts. Reattached loose bracket on east elevation at no charge.',
    isSample: true,
  },
  {
    id: 'req-008',
    referenceNumber: 'LPC-8019',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    serviceType: 'Deck & Patio Cleaning',
    propertyType: 'Residential',
    projectSize: 'Trex composite deck (~320 sq ft) and stamped concrete firepit patio',
    timeframe: 'Flexible / No rush',
    description:
      'Composite deck has black spot mold from shade trees, and stamped concrete needs mild wash and assessment for resealing.',
    customerName: 'Greg Kowalski',
    email: 'greg.kowalski.demo@example.com',
    phone: '(269) 555-0943',
    zipCode: '49008', // Kalamazoo, MI
    status: 'Closed',
    internalNotes:
      'Customer decided to postpone until early spring season. Noted to re-engage in March.',
    isSample: true,
  },
];
