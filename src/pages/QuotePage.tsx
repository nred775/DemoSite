import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Droplets,
  Sparkles,
  ShieldAlert,
  SunMedium,
  Check,
  Building2,
  Home,
  AlertCircle,
  LayoutDashboard,
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkle,
} from 'lucide-react';
import { QuoteRequest, ServiceType, PropertyType, PageView } from '../types';
import { addRequest, generateUniqueReferenceNumber } from '../utils/storage';

interface QuotePageProps {
  preselectedService: ServiceType | null;
  onNavigate: (page: PageView) => void;
  onSubmittedSuccess: (newRequest: QuoteRequest) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({
  preselectedService,
  onNavigate,
  onSubmittedSuccess,
}) => {
  // Wizard state: 1 = Service, 2 = Project Details, 3 = Contact Info, 4 = Review & Submit, 5 = Confirmation
  const [step, setStep] = useState<number>(1);

  // Form fields
  const [serviceType, setServiceType] = useState<ServiceType>(
    preselectedService || 'Pressure Washing'
  );
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential');
  const [projectSize, setProjectSize] = useState<string>('Two-story home (~2,400 sq ft)');
  const [timeframe, setTimeframe] = useState<string>('Within 1-2 weeks');
  const [description, setDescription] = useState<string>('');

  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('49423'); // Holland, MI

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submission result
  const [submittedRequest, setSubmittedRequest] = useState<QuoteRequest | null>(null);

  // Update service if prop changes
  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService);
    }
  }, [preselectedService]);

  const serviceOptions: {
    type: ServiceType;
    label: string;
    description: string;
    icon: any;
  }[] = [
    {
      type: 'Pressure Washing',
      label: 'Pressure & Soft Washing',
      description: 'Siding soft-wash, aggregate concrete driveway, walkway, and retaining walls.',
      icon: Droplets,
    },
    {
      type: 'Window Cleaning',
      label: 'Pure Water Window Cleaning',
      description: 'Spot-free 0-PPM interior/exterior glass detailing, screens, and sills.',
      icon: Sparkles,
    },
    {
      type: 'Gutter Cleaning',
      label: 'Gutter & Downspout Cleanout',
      description: 'Hand removal of leaves and pine needles plus full downspout water flush.',
      icon: ShieldAlert,
    },
    {
      type: 'Deck & Patio Cleaning',
      label: 'Deck & Patio Restoration',
      description: 'Safe bio-wash for cedar, composite Trex, and stone pavers.',
      icon: SunMedium,
    },
  ];

  const projectSizeOptions = [
    'Single-story cottage / home (<1,600 sq ft)',
    'Two-story standard home (~1,600 - 2,800 sq ft)',
    'Large custom lakeshore home (2,800+ sq ft)',
    'Commercial storefront or office facade',
    'Standalone hardscape only (driveway/deck/patio)',
  ];

  const timeframeOptions = [
    'Urgent / Next available opening',
    'Within 1-2 weeks',
    'Within a month',
    'Flexible / Planning ahead',
  ];

  // Quick fill with fictional sample data for seamless testing
  const handleFillDemoData = () => {
    setCustomerName('Jordan Albright (Demo)');
    setEmail('jordan.albright.demo@example.com');
    setPhone('(616) 555-0198');
    setZipCode('49423');
    setDescription(
      'North elevation has heavy green moss from shade trees, and lake winds left fine sand film on the front walkway. Looking to refresh before hosting family next weekend.'
    );
    setErrors({});
  };

  // Step navigation & validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!serviceType) {
        newErrors.serviceType = 'Please select a service to proceed.';
      }
    } else if (currentStep === 2) {
      if (!propertyType) {
        newErrors.propertyType = 'Please choose Residential or Commercial.';
      }
      if (!projectSize) {
        newErrors.projectSize = 'Please specify approximate project size.';
      }
      if (!timeframe) {
        newErrors.timeframe = 'Please select your preferred timeframe.';
      }
    } else if (currentStep === 3) {
      if (!customerName.trim()) {
        newErrors.customerName = 'Please enter a name (fictional demonstration name).';
      }
      if (!email.trim()) {
        newErrors.email = 'Please enter an email address for quote delivery.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address format.';
      }
      if (!zipCode.trim()) {
        newErrors.zipCode = 'Please provide a 5-digit Michigan ZIP code.';
      } else if (!/^\d{5}$/.test(zipCode.trim())) {
        newErrors.zipCode = 'ZIP code must be 5 digits (e.g. 49423).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    // Generate unique reference number (e.g. LPC-8492) guaranteed non-colliding
    const refCode = generateUniqueReferenceNumber();

    const newRequest: QuoteRequest = {
      id: `req-${Date.now()}`,
      referenceNumber: refCode,
      createdAt: new Date().toISOString(),
      serviceType,
      propertyType,
      projectSize,
      timeframe,
      description: description.trim() || 'No additional project notes provided.',
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      zipCode: zipCode.trim(),
      status: 'New',
      internalNotes: 'Received via online quote wizard. Ready for administrative review.',
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isSample: false,
    };

    // Save into localStorage
    addRequest(newRequest);
    setSubmittedRequest(newRequest);
    onSubmittedSuccess(newRequest);
    setStep(5); // Confirmation screen
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3.5 py-1 rounded-full border border-[#D0DED4]">
          End-to-End Demonstration Wizard
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163024]">
          Request a Free Exterior Care Quote
        </h1>
        <p className="text-sm sm:text-base text-[#526359] max-w-xl mx-auto">
          Experience the interactive lead intake system. Submissions are saved directly into your browser’s local store and immediately populate the business CRM dashboard.
        </p>

        <div className="inline-block p-2.5 rounded-xl bg-[#F0EBE2] border border-[#DDD5C9] text-xs text-[#5C6E64] max-w-md mx-auto mt-2">
          <strong>Demo Sandbox Notice:</strong> Please use fictional demonstration information. No real emails or contracts are created.
        </div>
      </div>

      {/* PROGRESS STEP INDICATOR (Steps 1 to 4) */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E4DCD2] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-[#163024] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Scope' },
              { num: 3, label: 'Contact' },
              { num: 4, label: 'Review' },
            ].map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-xs ${
                      isPassed
                        ? 'bg-[#163024] text-white'
                        : isCurrent
                        ? 'bg-[#163024] text-[#A3E6BA] ring-4 ring-[#DCE7E1]'
                        : 'bg-white text-[#788A80] border border-[#D5CCC1]'
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 transition-colors ${
                      isCurrent || isPassed ? 'text-[#163024]' : 'text-[#87998F]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN WIZARD CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#E6DDD2] shadow-sm p-6 sm:p-10">
        {/* ================= STEP 1: SELECT SERVICE ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-[#F0EBE3] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#163024]">
                Step 1: Choose Your Exterior Service
              </h2>
              <p className="text-sm text-[#57655D] mt-1">
                Select the primary exterior service required for your property.
              </p>
            </div>

            {errors.serviceType && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.serviceType}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = serviceType === opt.type;
                return (
                  <div
                    key={opt.type}
                    onClick={() => setServiceType(opt.type)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#163024] bg-[#F3F7F4] shadow-xs'
                        : 'border-[#E7DFD4] hover:border-[#CAD7CF] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#163024] text-[#A3E6BA]'
                            : 'bg-[#EAE4DC] text-[#44554B]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#163024] bg-[#163024] text-white'
                            : 'border-[#C8BFB3]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-base font-bold text-[#163024]">
                        {opt.label}
                      </h3>
                      <p className="text-xs text-[#526359] mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Project Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PROJECT DETAILS ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-[#F0EBE3] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#163024]">
                Step 2: Project Specifications
              </h2>
              <p className="text-sm text-[#57655D] mt-1">
                Tell us about the property and your scheduling target for <strong>{serviceType}</strong>.
              </p>
            </div>

            {/* Property Type Radio */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                Property Classification *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPropertyType('Residential')}
                  className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                    propertyType === 'Residential'
                      ? 'border-[#163024] bg-[#F3F7F4] text-[#163024]'
                      : 'border-[#E7DFD4] hover:border-[#CAD7CF] text-[#4E5E55]'
                  }`}
                >
                  <Home className="w-5 h-5 text-[#537A67]" />
                  <div>
                    <span className="font-bold text-sm block">Residential</span>
                    <span className="text-[11px] text-[#708277]">Home, cottage, or condo</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPropertyType('Commercial')}
                  className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                    propertyType === 'Commercial'
                      ? 'border-[#163024] bg-[#F3F7F4] text-[#163024]'
                      : 'border-[#E7DFD4] hover:border-[#CAD7CF] text-[#4E5E55]'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#537A67]" />
                  <div>
                    <span className="font-bold text-sm block">Commercial</span>
                    <span className="text-[11px] text-[#708277]">Storefront, office, retail</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Approximate Size Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                Approximate Project Size / Dimensions *
              </label>
              <select
                value={projectSize}
                onChange={(e) => setProjectSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D5CCC1] bg-white text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
              >
                {projectSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                Preferred Service Timeframe *
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D5CCC1] bg-white text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
              >
                {timeframeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                Project Description or Specific Focus Areas (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="E.g., north-facing siding has noticeable green mold, or cedar deck needs brightening before upcoming event..."
                className="w-full px-4 py-3 rounded-xl border border-[#D5CCC1] bg-white text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024] placeholder:text-[#9AA89F]"
              />
            </div>

            {/* Nav buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-[#F0EBE3]">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5CCC1] text-sm font-semibold text-[#4E5E55] hover:bg-[#F4EFE7] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Contact Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CONTACT INFORMATION ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE3] pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#163024]">
                  Step 3: Contact & Location Information
                </h2>
                <p className="text-sm text-[#57655D] mt-1">
                  Enter fictional demo details to receive your generated reference number.
                </p>
              </div>

              {/* Instant demo fill button */}
              <button
                type="button"
                onClick={handleFillDemoData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8EFE9] hover:bg-[#D5E4D8] text-[#163024] text-xs font-bold border border-[#C2D6C8] transition-colors cursor-pointer self-start sm:self-auto"
                title="Populate fields with fictional example data for rapid testing"
              >
                <Sparkle className="w-3.5 h-3.5 text-[#537A67]" />
                <span>Fill Fictional Demo Data</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                  Customer Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#73857B]" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Jordan Albright (Demo)"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 ${
                      errors.customerName
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/40'
                        : 'border-[#D5CCC1] focus:ring-[#163024] bg-white'
                    }`}
                  />
                </div>
                {errors.customerName && (
                  <span className="text-xs text-red-600 block">{errors.customerName}</span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#73857B]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jordan.demo@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/40'
                        : 'border-[#D5CCC1] focus:ring-[#163024] bg-white'
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-600 block">{errors.email}</span>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-[#73857B]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(616) 555-0198"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5CCC1] bg-white text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 focus:ring-[#163024]"
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                  Michigan ZIP Code *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-[#73857B]" />
                  <input
                    type="text"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="49423"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#1E2823] focus:outline-hidden focus:ring-2 ${
                      errors.zipCode
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/40'
                        : 'border-[#D5CCC1] focus:ring-[#163024] bg-white'
                    }`}
                  />
                </div>
                {errors.zipCode && (
                  <span className="text-xs text-red-600 block">{errors.zipCode}</span>
                )}
                <span className="text-[11px] text-[#718478] block">
                  e.g. 49423 (Holland), 49503 (Grand Rapids), 49417 (Grand Haven)
                </span>
              </div>
            </div>

            {/* Nav buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-[#F0EBE3]">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5CCC1] text-sm font-semibold text-[#4E5E55] hover:bg-[#F4EFE7] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Review Your Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#F0EBE3] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#163024]">
                Step 4: Review Your Fictional Submission
              </h2>
              <p className="text-sm text-[#57655D] mt-1">
                Verify your entered parameters before saving into the local demonstration database.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E6DDD2] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E8E1D6] text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Service Requested:
                  </span>
                  <span className="font-semibold text-base text-[#163024] block">
                    {serviceType}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Property Classification:
                  </span>
                  <span className="font-semibold text-base text-[#163024] block">
                    {propertyType}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Approximate Dimensions:
                  </span>
                  <span className="text-[#324037] block">{projectSize}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Target Timeframe:
                  </span>
                  <span className="text-[#324037] block">{timeframe}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#E8E1D6] text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Customer Name:
                  </span>
                  <span className="font-semibold text-[#163024] block">{customerName}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Email Address:
                  </span>
                  <span className="text-[#324037] block">{email}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Phone (Optional):
                  </span>
                  <span className="text-[#324037] block">{phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block">
                    Michigan ZIP:
                  </span>
                  <span className="text-[#324037] block">{zipCode}</span>
                </div>
              </div>

              {description && (
                <div className="text-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73857B] block mb-1">
                    Project Notes:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4E5E55] italic bg-white p-3 rounded-xl border border-[#E6DDD2]">
                    &ldquo;{description}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#E8EFE9] border border-[#D0DED4] text-xs text-[#294B39]">
              <strong>Local Browser Storage:</strong> Upon clicking &ldquo;Submit Quote Request&rdquo;, a unique reference code will be generated and saved to your browser&rsquo;s demo leads list. You can immediately open the business dashboard to see it.
            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-[#F0EBE3]">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D5CCC1] text-sm font-semibold text-[#4E5E55] hover:bg-[#F4EFE7] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white font-bold text-sm shadow-md transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>Submit Quote Request</span>
                <Check className="w-4 h-4 text-[#A3E6BA]" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 5: SUCCESS CONFIRMATION ================= */}
        {step === 5 && submittedRequest && (
          <div className="text-center py-6 sm:py-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 text-[#163024]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3.5 py-1 rounded-full">
                Request Recorded Locally
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
                Quote Request Confirmed
              </h2>
              <p className="text-sm sm:text-base text-[#526359] max-w-md mx-auto">
                Your demonstration project inquiry has been successfully generated and stored in your browser’s demo data namespace.
              </p>
            </div>

            {/* Highlighted Reference Code Box */}
            <div className="max-w-md mx-auto bg-[#FAF7F2] border-2 border-dashed border-[#163024]/40 p-6 rounded-2xl space-y-2">
              <span className="text-xs font-semibold text-[#66786D] uppercase tracking-wider block">
                Project Reference Number
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#163024] tracking-wider">
                {submittedRequest.referenceNumber}
              </div>
              <span className="text-xs text-[#526359] block">
                Recorded {new Date(submittedRequest.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Status: <span className="font-bold text-[#2A523E]">New Inquiry</span>
              </span>
            </div>

            {/* Quick Summary Pill Strip */}
            <div className="max-w-md mx-auto bg-white p-4 rounded-xl border border-[#E6DDD2] text-xs text-left space-y-1 text-[#4E5E55]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#163024]">Service:</span>
                <span>{submittedRequest.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#163024]">Customer:</span>
                <span>{submittedRequest.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#163024]">Location:</span>
                <span>ZIP {submittedRequest.zipCode} (Michigan)</span>
              </div>
            </div>

            {/* KEY ACTION: View in Demo Dashboard */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-[#A3E6BA]" />
                <span>View Your Request in the Demo Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setCustomerName('');
                  setEmail('');
                  setPhone('');
                  setDescription('');
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#D5CCC1] text-xs font-semibold text-[#4E5E55] hover:bg-[#F4EFE7] transition-colors cursor-pointer"
              >
                Submit Another Demo Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
