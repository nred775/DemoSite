import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  RotateCcw,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Copy,
  Check,
  X,
  FileText,
  AlertCircle,
  Wrench,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { QuoteRequest, RequestStatus, ServiceType, PageView } from '../types';
import {
  getStoredRequests,
  updateRequestStatus,
  updateRequestNotes,
  updateRequestFollowUp,
  resetToSampleData,
  exportToCsv,
} from '../utils/storage';
import { generateDraftEmailReply, generateLocalDeterministicBrief } from '../utils/draftHelpers';

interface DashboardPageProps {
  onNavigate: (page: PageView) => void;
  onRefreshRequests: () => void;
  requests: QuoteRequest[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onRefreshRequests,
  requests,
}) => {
  // Filters & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Selected request for detail modal
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  // Internal notes editable state in modal
  const [activeNotes, setActiveNotes] = useState('');
  const [activeFollowUp, setActiveFollowUp] = useState('');
  const [saveNotesFeedback, setSaveNotesFeedback] = useState(false);

  // Draft reply state
  const [showDraftReply, setShowDraftReply] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // AI Job Brief state
  const [aiBriefLoading, setAiBriefLoading] = useState(false);
  const [aiBriefResult, setAiBriefResult] = useState<string | null>(null);
  const [aiBriefError, setAiBriefError] = useState<string | null>(null);

  // Reset confirmation modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync selected request edits when opened
  const handleOpenDetail = (req: QuoteRequest) => {
    setSelectedRequest(req);
    setActiveNotes(req.internalNotes || '');
    setActiveFollowUp(req.followUpDate || '');
    setShowDraftReply(false);
    setAiBriefResult(null);
    setAiBriefError(null);
    setSaveNotesFeedback(false);
  };

  // Status update
  const handleStatusChange = (newStatus: RequestStatus) => {
    if (!selectedRequest) return;
    const updated = updateRequestStatus(selectedRequest.id, newStatus);
    if (updated) {
      setSelectedRequest({ ...updated });
      onRefreshRequests();
    }
  };

  // Notes save
  const handleSaveNotes = () => {
    if (!selectedRequest) return;
    const updated = updateRequestNotes(selectedRequest.id, activeNotes);
    if (updated) {
      setSelectedRequest({ ...updated });
      onRefreshRequests();
      setSaveNotesFeedback(true);
      setTimeout(() => setSaveNotesFeedback(false), 2500);
    }
  };

  // Follow-up date save
  const handleFollowUpChange = (newDate: string) => {
    setActiveFollowUp(newDate);
    if (!selectedRequest) return;
    const updated = updateRequestFollowUp(selectedRequest.id, newDate);
    if (updated) {
      setSelectedRequest({ ...updated });
      onRefreshRequests();
    }
  };

  // Reset data handler
  const handleResetData = () => {
    resetToSampleData();
    onRefreshRequests();
    setSelectedRequest(null);
    setShowResetConfirm(false);
  };

  // Safe Blob-based CSV Export handler
  const handleExportCSV = () => {
    exportToCsv(requests);
  };

  // Copy helpers
  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDraftText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  // Trigger AI Job Brief
  const handleGenerateAiBrief = async () => {
    if (!selectedRequest) return;
    setAiBriefLoading(true);
    setAiBriefError(null);

    try {
      const res = await fetch('/api/job-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: selectedRequest }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.brief) {
        setAiBriefResult(data.brief);
      } else {
        throw new Error('Brief not returned');
      }
    } catch (err: any) {
      // Graceful fallback to rich deterministic synthesis
      console.warn('API brief fallback:', err);
      const fallbackBrief = generateLocalDeterministicBrief(selectedRequest);
      setAiBriefResult(fallbackBrief);
    } finally {
      setAiBriefLoading(false);
    }
  };

  // Compute metric cards
  const metrics = useMemo(() => {
    const total = requests.length;
    const countNew = requests.filter((r) => r.status === 'New').length;
    const inProgress = requests.filter((r) => r.status === 'In Progress' || r.status === 'Quoted').length;
    const completed = requests.filter((r) => r.status === 'Completed').length;
    return { total, countNew, inProgress, completed };
  }, [requests]);

  // Filtered and sorted requests
  const filteredRequests = useMemo(() => {
    return requests
      .filter((r) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.customerName.toLowerCase().includes(q);
          const matchRef = r.referenceNumber.toLowerCase().includes(q);
          const matchEmail = r.email.toLowerCase().includes(q);
          if (!matchName && !matchRef && !matchEmail) return false;
        }

        // Service filter
        if (serviceFilter !== 'All' && r.serviceType !== serviceFilter) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'All' && r.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [requests, searchQuery, serviceFilter, statusFilter, sortOrder]);

  // Status Badge UI helper
  const renderStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E1F5EA] text-[#0F5A31] border border-[#A8E4C0]">
            New Inquiry
          </span>
        );
      case 'Quoted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F0FA] text-[#1D4E89] border border-[#B8D7F7]">
            Quoted
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3D6] text-[#8C5E0A] border border-[#FAD782]">
            In Progress
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8EFE9] text-[#163024] border border-[#C5D8CC]">
            Completed
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EDEBE8] text-[#555047] border border-[#D5D0C9]">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* TOP BANNER & NOTICE */}
      <div className="bg-[#163024] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#2A523E] text-[#A3E6BA] tracking-wider uppercase">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>DEMO DASHBOARD — FICTIONAL DATA</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Business Operations & Lead Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#C4D8CD] leading-relaxed">
              Demonstrating the back-office management side of Lakeshore Property Care. Submissions from the public Quote form appear here instantly. Update statuses, add internal notes, create replies, and run AI job briefs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#163024] hover:bg-[#F2ECE3] font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span>+ Submit New Quote</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#234735] hover:bg-[#2C5641] text-[#E0EBE4] font-medium text-xs border border-[#3A6B50] transition-colors cursor-pointer"
              title="Download inquiries as spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#234735] hover:bg-[#2C5641] text-[#E0EBE4] font-medium text-xs border border-[#3A6B50] transition-colors cursor-pointer"
              title="Reset data back to seed state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-[#E7DFD4] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
            Total Inquiries
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
              {metrics.total}
            </span>
            <span className="text-xs font-semibold text-[#526359]">All Time</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7DFD4] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F5A31] block">
            New Inquiries
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F5A31]">
              {metrics.countNew}
            </span>
            <span className="text-xs font-semibold text-[#0F5A31] bg-[#E1F5EA] px-2 py-0.5 rounded-full">
              Needs Review
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7DFD4] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E0A] block">
            Active / Quoted
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8C5E0A]">
              {metrics.inProgress}
            </span>
            <span className="text-xs font-semibold text-[#8C5E0A] bg-[#FEF3D6] px-2 py-0.5 rounded-full">
              Scheduled
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7DFD4] shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#163024] block">
            Completed Jobs
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
              {metrics.completed}
            </span>
            <span className="text-xs font-semibold text-[#163024] bg-[#E8EFE9] px-2 py-0.5 rounded-full">
              Fulfilled
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7DFD4] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#73857B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer or LPC code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CCC1] text-xs sm:text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#73857B] hover:text-[#163024]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Service Filter */}
          <div className="lg:col-span-3">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#D5CCC1] bg-white text-xs sm:text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
            >
              <option value="All">All Services</option>
              <option value="Pressure Washing">Pressure Washing</option>
              <option value="Window Cleaning">Window Cleaning</option>
              <option value="Gutter Cleaning">Gutter Cleaning</option>
              <option value="Deck & Patio Cleaning">Deck & Patio Cleaning</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#D5CCC1] bg-white text-xs sm:text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Quoted">Quoted</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="lg:col-span-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#D5CCC1] text-xs sm:text-sm font-semibold text-[#3D4D44] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <span>Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#537A67]" />
            </button>
          </div>
        </div>

        {/* Results summary pill */}
        <div className="flex items-center justify-between text-xs text-[#5C6E64] pt-2 border-t border-[#F0EBE3]">
          <span>
            Showing <strong>{filteredRequests.length}</strong> of {requests.length} total inquiries
          </span>
          {(searchQuery || serviceFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setServiceFilter('All');
                setStatusFilter('All');
              }}
              className="text-[#163024] font-semibold hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* REQUESTS LIST / TABLE */}
      <div className="bg-white rounded-2xl border border-[#E7DFD4] shadow-xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#8C9B92] flex items-center justify-center mx-auto border border-[#E7DFD4]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#163024]">
              No Inquiries Match Your Filter
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6E64] max-w-sm mx-auto">
              Try adjusting your search terms or clearing status filters to view records.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] text-[#55675D] font-bold uppercase tracking-wider text-[11px] border-b border-[#E7DFD4]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Reference</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Service</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Location</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3]">
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => handleOpenDetail(req)}
                    className="hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
                  >
                    {/* Reference */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#163024]">
                      <div className="flex items-center gap-2">
                        <span>{req.referenceNumber}</span>
                        {req.isSample === false && (
                          <span className="px-1.5 py-0.2 rounded-sm text-[9px] font-bold bg-[#A3E6BA] text-[#0F261C] uppercase tracking-wide">
                            Live
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4 font-semibold text-[#1E2823]">
                      <div>{req.customerName}</div>
                      <div className="text-[11px] text-[#718277] font-normal truncate max-w-[160px]">
                        {req.email}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-4 hidden md:table-cell text-[#38463E]">
                      <div className="font-medium">{req.serviceType}</div>
                      <div className="text-[11px] text-[#718277]">{req.propertyType}</div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 hidden lg:table-cell text-[#526257]">
                      <span>ZIP {req.zipCode}</span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-[#526257] whitespace-nowrap">
                      <div>
                        {new Date(req.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-[11px] text-[#809187]">
                        {new Date(req.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {renderStatusBadge(req.status)}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(req);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] group-hover:bg-[#163024] group-hover:text-white text-[#2C4839] border border-[#D5CCC1] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL / SLIDE-OVER */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E4DCD3] overflow-hidden text-[#1E2823] max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#163024] text-white p-5 sm:p-6 flex items-start justify-between border-b border-[#244535] shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-[#A3E6BA]">
                    {selectedRequest.referenceNumber}
                  </span>
                  <span className="text-xs text-[#C4D8CD]">
                    • Received {new Date(selectedRequest.createdAt).toLocaleString()}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {selectedRequest.customerName}
                </h2>
                <div className="text-xs text-[#A8BEB1] mt-0.5">
                  {selectedRequest.serviceType} • {selectedRequest.propertyType} • ZIP {selectedRequest.zipCode}
                </div>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="text-[#C4D8CD] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {/* STATUS CONTROLLER */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B]">
                    Lead Status Control
                  </span>
                  <span className="text-xs text-[#6B7D72]">
                    Updates immediately in storage
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['New', 'Quoted', 'In Progress', 'Completed', 'Closed'] as RequestStatus[]).map((st) => {
                    const isActive = selectedRequest.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#163024] text-white shadow-xs scale-102'
                            : 'bg-[#FAF7F2] text-[#48594F] hover:bg-[#EAE4DC] border border-[#DDD5C9]'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOMER & SCOPE DETAILS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Box */}
                <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Customer Contact Info
                  </span>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Email:</span>
                      <div className="flex items-center gap-1.5 font-medium text-[#163024]">
                        <span>{selectedRequest.email}</span>
                        <button
                          onClick={() => handleCopyEmail(selectedRequest.email)}
                          className="text-[#537A67] hover:text-[#163024] p-1 rounded-md cursor-pointer"
                          title="Copy customer email"
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Phone:</span>
                      <span className="font-medium text-[#163024]">
                        {selectedRequest.phone || 'Not provided'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Michigan ZIP:</span>
                      <span className="font-medium text-[#163024]">{selectedRequest.zipCode}</span>
                    </div>
                  </div>
                </div>

                {/* Project Specs Box */}
                <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Scope Parameters
                  </span>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Dimensions:</span>
                      <span className="font-medium text-[#163024] text-right truncate max-w-[180px]">
                        {selectedRequest.projectSize}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Target Timeframe:</span>
                      <span className="font-medium text-[#163024]">{selectedRequest.timeframe}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64756B]">Property Type:</span>
                      <span className="font-medium text-[#163024]">{selectedRequest.propertyType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOMER NOTES */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                  Customer Project Notes / Description:
                </span>
                <p className="text-xs sm:text-sm text-[#3E4E45] italic bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8E1D6] leading-relaxed">
                  &ldquo;{selectedRequest.description}&rdquo;
                </p>
              </div>

              {/* INTERNAL TECHNICIAN NOTES & FOLLOW-UP DATE */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Internal Crew / Estimator Notes
                  </span>
                  {saveNotesFeedback && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Notes Saved!</span>
                    </span>
                  )}
                </div>

                <textarea
                  value={activeNotes}
                  onChange={(e) => setActiveNotes(e.target.value)}
                  rows={3}
                  placeholder="Record crew observations, water hookup verification, pricing notes, or follow-up details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCC1] text-xs sm:text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#63756A] font-medium">Follow-Up Date:</span>
                    <input
                      type="date"
                      value={activeFollowUp}
                      onChange={(e) => handleFollowUpChange(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-[#D5CCC1] text-xs font-medium text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
                    />
                  </div>

                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Save Internal Notes
                  </button>
                </div>
              </div>

              {/* SMART ACTIONS: DRAFT REPLY & AI JOB BRIEF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Draft Email Generator Button */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E4DDD2] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#163024] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#537A67]" />
                      <span>Draft Customer Response</span>
                    </h4>
                    <p className="text-xs text-[#5E7065] mt-1">
                      Generate a personalized email draft referencing this inquiry’s scope and timeline.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDraftReply(!showDraftReply)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-[#D5CCC1] text-xs font-bold text-[#163024] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
                  >
                    {showDraftReply ? 'Hide Email Draft' : 'Preview Email Draft'}
                  </button>
                </div>

                {/* AI Job Brief Generator */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E4DDD2] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#163024] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#537A67]" />
                      <span>AI Job Brief Generator</span>
                    </h4>
                    <p className="text-xs text-[#5E7065] mt-1">
                      Produce an operational brief with required tools, safety precautions, and execution steps.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateAiBrief}
                    disabled={aiBriefLoading}
                    className="w-full py-2 px-3 rounded-xl bg-[#163024] text-white text-xs font-bold hover:bg-[#1E3F30] disabled:opacity-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {aiBriefLoading ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Synthesizing Brief...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#A3E6BA]" />
                        <span>Generate Operational Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* DRAFT REPLY DISPLAY AREA */}
              {showDraftReply && (
                <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#73857B]">
                      Formatted Customer Email Draft:
                    </span>
                    <button
                      onClick={() => handleCopyDraftText(generateDraftEmailReply(selectedRequest))}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#163024] hover:underline cursor-pointer"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#537A67]" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs font-mono bg-[#FAF7F2] p-4 rounded-xl border border-[#E6DDD2] whitespace-pre-wrap text-[#26352C] leading-relaxed">
                    {generateDraftEmailReply(selectedRequest)}
                  </pre>
                </div>
              )}

              {/* AI JOB BRIEF DISPLAY AREA */}
              {aiBriefResult && (
                <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] shadow-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2A523E] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#537A67]" />
                      <span>Operational Job Brief (Server-Synthesized):</span>
                    </span>
                    <button
                      onClick={() => handleCopyDraftText(aiBriefResult)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#163024] hover:underline cursor-pointer"
                    >
                      {copiedDraft ? (
                        <span className="text-emerald-700">Copied!</span>
                      ) : (
                        <span>Copy Brief</span>
                      )}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm bg-[#F5F8F6] p-4 rounded-xl border border-[#CFDFD5] text-[#163024] leading-relaxed whitespace-pre-line">
                    {aiBriefResult}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#F3ECE2] border-t border-[#E4DCD3] flex items-center justify-between shrink-0">
              <span className="text-xs text-[#6B7C71]">
                Stored locally • Changes sync instantly
              </span>
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2 rounded-xl bg-[#163024] text-white text-xs font-bold hover:bg-[#1E3F30] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET DATA CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E7DFD4] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#163024]">
              Reset Demo Inquiries?
            </h3>
            <p className="text-xs sm:text-sm text-[#57655D] leading-relaxed">
              This will restore the initial set of 8 realistic fictional inquiries and clear any quote requests you submitted during this testing session.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-[#D5CCC1] text-xs font-semibold text-[#4E5E55] hover:bg-[#FAF7F2] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Yes, Reset Inquiries
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
