import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Sparkles, Droplets, ShieldCheck, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { ServiceHighlightStrip } from '../components/ServiceHighlightStrip';
import { BeforeAfterShowcase } from '../components/BeforeAfterShowcase';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES_DATA } from '../data/servicesData';
import { PageView, ServiceType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
  onOpenWalkthrough: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
  onOpenWalkthrough,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF7F2] pt-8 sm:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EFE9] text-[#163024] text-xs sm:text-sm font-semibold border border-[#D5E2D8]">
                <Droplets className="w-4 h-4 text-[#537A67]" />
                <span>Michigan Lakeshore Exterior Property Detailing</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#163024] leading-[1.12]">
                A cleaner property.{' '}
                <span className="italic font-normal text-[#2A523E] block sm:inline">
                  A better first impression.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#4E5D54] leading-relaxed max-w-2xl font-normal">
                Specialized exterior cleaning for Michigan homes and commercial storefronts. We bring precision soft washing, zero-streak pure water window detailing, and comprehensive gutter care to lake-facing properties across West Michigan.
              </p>

              {/* Primary Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('quote')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white text-base font-semibold shadow-md hover:shadow-lg transition-all hover:translate-y-[-1px] cursor-pointer"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#F4EFE7] text-[#163024] text-base font-semibold border border-[#DCD3C6] shadow-xs transition-colors cursor-pointer"
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#526359]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#537A67]" />
                  <span>Calibrated Pressure Protection</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#537A67]" />
                  <span>0-PPM Spot-Free Rinse</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#537A67]" />
                  <span>Plant & Pet Conscious</span>
                </span>
              </div>
            </div>

            {/* Hero Right Column: Photographic Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#E3DDD3]">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                  alt="Spotless Michigan lakeside residential home exterior"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/60 text-xs text-[#1E2823] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#537A67] block">
                      Featured Technique
                    </span>
                    <span className="font-semibold text-sm text-[#163024] block">
                      Low-Pressure Siding Soft Wash
                    </span>
                    <span className="text-[#64756B] text-[11px]">
                      Safe for vinyl, cedar shake & brick mortar
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectServiceForQuote('Pressure Washing')}
                    className="px-3 py-1.5 rounded-lg bg-[#163024] text-white font-semibold text-xs shrink-0 hover:bg-[#1D3D2F] cursor-pointer"
                  >
                    Quote
                  </button>
                </div>
              </div>

              {/* Demonstration Note Badge */}
              <div className="mt-3 text-center sm:text-right">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#6E8075] bg-[#EAE3D8] px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#537A67]" />
                  <span>Portfolio Concept by Noah Redman • Michigan Demo</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHT STRIP */}
      <ServiceHighlightStrip />

      {/* FOUR CORE SERVICE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3 py-1 rounded-full">
            Our Core Specialties
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
            Comprehensive Exterior Care
          </h2>
          <p className="text-sm sm:text-base text-[#57655D]">
            Each service is executed with tailored equipment and surface-safe chemistry engineered specifically for Michigan’s four-season climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectServiceForQuote={onSelectServiceForQuote}
              onViewServiceDetails={() => onNavigate('services')}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#163024] hover:text-[#234F3A] hover:underline cursor-pointer"
          >
            <span>View deep specifications and process checklists for all services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* HOW IT WORKS: 3 STEPS */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#E9E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3 py-1 rounded-full">
              Streamlined Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-[#57655D]">
              Getting your property restored is straightforward and transparent from initial quote inquiry to final inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E7E0D6] shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#163024] text-[#A3E6BA] flex items-center justify-center font-serif font-bold text-xl">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold text-[#163024]">
                  Tell Us About Your Project
                </h3>
                <p className="text-sm text-[#57655D] leading-relaxed">
                  Submit our 4-step quote form with your property type, approximate dimensions, and target timeframe. You’ll receive an immediate reference number.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F2EDE5] text-xs text-[#537A67] font-semibold">
                Takes under 90 seconds
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E7E0D6] shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#163024] text-[#A3E6BA] flex items-center justify-center font-serif font-bold text-xl">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-[#163024]">
                  Review Your Quote
                </h3>
                <p className="text-sm text-[#57655D] leading-relaxed">
                  We evaluate your property dimensions, verify site water access, and send a transparent scope breakdown without hidden add-on fees.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F2EDE5] text-xs text-[#537A67] font-semibold">
                Clear, itemized pricing
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#E7E0D6] shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#163024] text-[#A3E6BA] flex items-center justify-center font-serif font-bold text-xl">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-[#163024]">
                  Enjoy the Results
                </h3>
                <p className="text-sm text-[#57655D] leading-relaxed">
                  Our trained crew arrives punctually, protects surrounding landscaping, executes streak-free detailing, and completes a final property walkthrough.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F2EDE5] text-xs text-[#537A67] font-semibold">
                Spotless satisfaction guarantee
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#163024] text-white font-semibold text-sm hover:bg-[#1D3E2F] transition-all shadow-xs cursor-pointer"
            >
              <span>Start Your Quote Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BEFORE AND AFTER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BeforeAfterShowcase />
      </section>

      {/* SERVICE AREA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E6DDD2] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#537A67]">
                <MapPin className="w-4 h-4" />
                <span>Regional Michigan Focus</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
                Rooted in Lake Michigan Communities
              </h2>
              <p className="text-sm sm:text-base text-[#4F5E55] leading-relaxed">
                Coastal Michigan properties face unique weather conditions: relentless lake breezes carrying fine sand, dense autumn pine and oak debris, and persistent mildew from heavy humidity. We tailor our cleaning chemistry specifically to withstand lakeshore weather.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-medium text-[#25352B]">
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Holland</span>
                  <span className="text-[#687C71] text-xs">Lake Macatawa</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Grand Rapids</span>
                  <span className="text-[#687C71] text-xs">Metro & Suburbs</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Grand Haven</span>
                  <span className="text-[#687C71] text-xs">Coast & Downtown</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Saugatuck</span>
                  <span className="text-[#687C71] text-xs">Dunes & Harbor</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Muskegon</span>
                  <span className="text-[#687C71] text-xs">Mona Lake & Coast</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Spring Lake</span>
                  <span className="text-[#687C71] text-xs">Waterfront Estates</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Traverse City</span>
                  <span className="text-[#687C71] text-xs">Seasonal Cottages</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#DDD5C8]">
                  <span className="font-bold block text-[#163024]">Kalamazoo</span>
                  <span className="text-[#687C71] text-xs">Southwest Corridor</span>
                </div>
              </div>
            </div>

            {/* Right Card: Seasonal Schedule Reminder */}
            <div className="lg:col-span-5 bg-[#163024] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E6BA] flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Seasonal Service Calendar</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F4F8F5]">
                Plan Your Annual Exterior Care
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#D3DFD7]">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#A3E6BA] mt-1.5 shrink-0" />
                  <span><strong>Spring (April–May):</strong> Siding soft wash to eradicate winter salt residue & moss; pure water window detailing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#A3E6BA] mt-1.5 shrink-0" />
                  <span><strong>Early Summer (June):</strong> Deck & patio bio-wash and stain prep before outdoor gathering season.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#A3E6BA] mt-1.5 shrink-0" />
                  <span><strong>Late Autumn (Oct–Nov):</strong> Full perimeter gutter cleanout & downspout flush before winter freeze-up.</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-3 rounded-xl bg-[#A3E6BA] hover:bg-[#8FE0AB] text-[#0E2218] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Schedule Fictional Demo Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#183527] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#284E3B] text-[#A3E6BA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to See the Full Workflow in Action?</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2F7F4]">
              Experience the dual website & lead dashboard.
            </h2>

            <p className="text-sm sm:text-base text-[#C2D6CA] leading-relaxed">
              Submit a quick fictional quote request right now, then watch it instantly appear inside the business CRM dashboard in your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8EFE9] hover:bg-white text-[#163024] font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Submit a Demo Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWalkthrough}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#234534] hover:bg-[#2C5641] text-white font-medium text-sm border border-[#346049] transition-colors cursor-pointer"
              >
                <span>Read the 2-Minute Guide</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
