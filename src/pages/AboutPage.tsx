import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, Sparkles, Droplets, MapPin } from 'lucide-react';
import { PageView } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
  onOpenWalkthrough: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenWalkthrough,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* EDITORIAL HERO SECTION */}
      <section className="bg-[#FAF7F2] border-b border-[#E8E1D7] pt-12 sm:pt-20 pb-14 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E8EFE9] text-[#163024] border border-[#D0DED4]">
            <Droplets className="w-3.5 h-3.5 text-[#537A67]" />
            <span>Fictional Small Business Concept</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#163024] leading-tight">
            Thoughtful exterior care designed for Lake Michigan homes.
          </h1>

          <p className="text-base sm:text-lg text-[#526359] leading-relaxed max-w-2xl mx-auto">
            Lakeshore Property Care is an illustrative concept developed to show how modern web architecture, transparent communication, and dedicated client tools transform the small-business service experience.
          </p>
        </div>
      </section>

      {/* BRAND STORY & DEMONSTRATION DISCLOSURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image with caption */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#E5DFD6]">
              <img
                src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80"
                alt="Exterior residential terrace along Lake Michigan shoreline"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
            </div>
            <div className="mt-3 text-center sm:text-left">
              <span className="text-[11px] text-[#718277] italic">
                *Illustrative photography representing Lake Michigan residential exterior environments.
              </span>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-3.5 rounded-xl bg-[#F0EBE2] border border-[#DCD3C7] text-xs text-[#57685E] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#163024]">
                <Sparkles className="w-4 h-4 text-[#537A67]" />
                <span>Illustrative Concept Disclosure</span>
              </div>
              <p>
                This narrative describes the fictional brand identity and values for Lakeshore Property Care, created as a portfolio demonstration for web developer Noah Redman.
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
              Respecting the surface. Respecting the homeowner.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#4E5E54] leading-relaxed">
              <p>
                Exterior surfaces along the Lake Michigan coastline face rapid seasonal shifts—spring pollen blooms, summer humidity fostering algae on north-facing siding, autumn leaf falls that choke gutters, and harsh winter freeze-thaw cycles that push soil into porous concrete.
              </p>
              <p>
                Too often, exterior cleaning is treated with brute force: aggressive high pressure that blasts off paint, fractures window seals, or gouges cedar decking. Lakeshore Property Care was conceptualized around an opposite ethos: <em>calibrated chemistry, surface-appropriate pressure, and zero-residue pure water rinses</em>.
              </p>
              <p>
                Equally important is the customer relationship: transparent initial estimates, prompt digital confirmations, and real-time operational organization so homeowners never have to wonder when their job will be completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER SERVICE APPROACH: 3 PILLARS */}
      <section className="bg-[#FAF7F2] py-16 sm:py-20 border-y border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3.5 py-1 rounded-full">
              Our Service Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024]">
              The Four Guiding Principles
            </h2>
            <p className="text-sm sm:text-base text-[#57655D]">
              Clear expectations and reliable craftsmanship guide every customer touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E7DFD4] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#163024]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#163024]">
                Surface Safety First
              </h3>
              <p className="text-xs sm:text-sm text-[#57655D] leading-relaxed">
                We assess the specific substrate—vinyl, brick, aggregate, composite, or cedar—before adjusting pressure or applying botanical solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7DFD4] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-[#163024]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#163024]">
                Transparent Scope
              </h3>
              <p className="text-xs sm:text-sm text-[#57655D] leading-relaxed">
                Quotes detail exactly what is included—down to window screen wash and downspout testing—eliminating surprise charges at checkout.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7DFD4] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#163024]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#163024]">
                Landscape Protection
              </h3>
              <p className="text-xs sm:text-sm text-[#57655D] leading-relaxed">
                Pre-soaking foundation greenery and using plant-safe neutralizers ensures Michigan gardens and turf remain protected.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7DFD4] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#163024]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#163024]">
                Final Property Walk
              </h3>
              <p className="text-xs sm:text-sm text-[#57655D] leading-relaxed">
                Technicians inspect all elevations and test downspout drainage before leaving, verifying high standards of cleanliness and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E5DDD2] space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#537A67]">
              Standard Operating Procedure
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#163024] mt-1">
              Our 4-Phase Work Order Flow
            </h2>
            <p className="text-sm text-[#57655D] mt-2">
              From online quote request to finished project verification, here is how our workflow is structured:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 border-t-2 border-[#163024] pt-4">
              <span className="text-xs font-bold text-[#537A67]">Phase 01</span>
              <h4 className="font-serif text-lg font-bold text-[#163024]">
                Initial Assessment
              </h4>
              <p className="text-xs text-[#57655D] leading-relaxed">
                Review submitted dimensions, square footage, water access, and customer notes.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-[#163024] pt-4">
              <span className="text-xs font-bold text-[#537A67]">Phase 02</span>
              <h4 className="font-serif text-lg font-bold text-[#163024]">
                Perimeter Protection
              </h4>
              <p className="text-xs text-[#57655D] leading-relaxed">
                Cover electrical receptacles, pre-rinse surrounding plantings, and position ladder standoffs.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-[#163024] pt-4">
              <span className="text-xs font-bold text-[#537A67]">Phase 03</span>
              <h4 className="font-serif text-lg font-bold text-[#163024]">
                Targeted Execution
              </h4>
              <p className="text-xs text-[#57655D] leading-relaxed">
                Apply calibrated chemistry, soft wash or rotary clean, and perform deionized spot-free rinse.
              </p>
            </div>

            <div className="space-y-2 border-t-2 border-[#163024] pt-4">
              <span className="text-xs font-bold text-[#537A67]">Phase 04</span>
              <h4 className="font-serif text-lg font-bold text-[#163024]">
                Closure & Verification
              </h4>
              <p className="text-xs text-[#57655D] leading-relaxed">
                Walk the perimeter, verify ground cleanup, and mark the order completed in the business dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163024] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#F2F7F4] max-w-xl mx-auto">
            Ready to test the quote system for yourself?
          </h2>
          <p className="text-sm sm:text-base text-[#C2D6CA] max-w-xl mx-auto">
            Try submitting a project request now to see how the client-facing intake and operational dashboard connect seamlessly.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8EFE9] hover:bg-white text-[#163024] font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Submit a Fictional Quote Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
