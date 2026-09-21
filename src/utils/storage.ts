import { QuoteRequest, RequestStatus } from '../types';
import { INITIAL_SAMPLE_REQUESTS } from '../data/sampleRequests';

const STORAGE_KEY = 'lakeshore_property_care_demo_requests_v1';

export function loadRequests(): QuoteRequest[] {
  if (typeof window === 'undefined') {
    return INITIAL_SAMPLE_REQUESTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First-time visit: seed with realistic sample requests
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_REQUESTS));
      return INITIAL_SAMPLE_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read demo requests from localStorage:', err);
    return INITIAL_SAMPLE_REQUESTS;
  }
}

export const getStoredRequests = loadRequests;

export function saveRequests(requests: QuoteRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save demo requests to localStorage:', err);
  }
}

export function addRequest(newRequest: QuoteRequest): QuoteRequest[] {
  const current = loadRequests();
  const updated = [newRequest, ...current];
  saveRequests(updated);
  return updated;
}

export function updateRequest(id: string, updates: Partial<QuoteRequest>): QuoteRequest | null {
  const current = loadRequests();
  let updatedItem: QuoteRequest | null = null;
  const updated = current.map((item) => {
    if (item.id === id) {
      updatedItem = { ...item, ...updates };
      return updatedItem;
    }
    return item;
  });
  saveRequests(updated);
  return updatedItem;
}

export function updateRequestStatus(id: string, status: RequestStatus): QuoteRequest | null {
  return updateRequest(id, { status });
}

export function updateRequestNotes(id: string, internalNotes: string): QuoteRequest | null {
  return updateRequest(id, { internalNotes });
}

export function updateRequestFollowUp(id: string, followUpDate: string): QuoteRequest | null {
  return updateRequest(id, { followUpDate });
}

export function resetDemoData(): QuoteRequest[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_REQUESTS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_REQUESTS));
  } catch (err) {
    console.error('Failed to reset demo requests in localStorage:', err);
  }
  return INITIAL_SAMPLE_REQUESTS;
}

export const resetToSampleData = resetDemoData;

export function exportToCsv(requests: QuoteRequest[]): void {
  if (typeof window === 'undefined' || requests.length === 0) return;

  const headers = [
    'Reference ID',
    'Date Received',
    'Status',
    'Customer Name',
    'Email',
    'Phone',
    'Service Requested',
    'Property Type',
    'Project Size',
    'Timeframe',
    'ZIP Code',
    'Follow Up Date',
    'Internal Notes',
    'Description',
  ];

  const escapeCsv = (str: string | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = requests.map((req) => [
    escapeCsv(req.referenceNumber),
    escapeCsv(new Date(req.createdAt).toLocaleString()),
    escapeCsv(req.status),
    escapeCsv(req.customerName),
    escapeCsv(req.email),
    escapeCsv(req.phone || ''),
    escapeCsv(req.serviceType),
    escapeCsv(req.propertyType),
    escapeCsv(req.projectSize),
    escapeCsv(req.timeframe),
    escapeCsv(req.zipCode),
    escapeCsv(req.followUpDate || ''),
    escapeCsv(req.internalNotes || ''),
    escapeCsv(req.description),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `lakeshore_property_care_demo_leads_${new Date().toISOString().split('T')[0]}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
