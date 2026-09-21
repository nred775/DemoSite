import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Droplets, Sparkles, ShieldAlert, SunMedium, Clock, Wrench } from 'lucide-react';
import { SERVICES_DATA, ServiceDetail } from '../data/servicesData';
import { PageView, ServiceType } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageView) => void;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#A3E6BA]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#A3E6BA]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#A3E6BA]" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-[#A3E6BA]" />;
      default:
        return <Droplets className="w-5 h-5 text-[#A3E6BA]" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* PAGE HEADER */}
      <section className="bg-[#FAF7F2] border-b border-[#E8E1D7] pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#537A67] bg-[#E8EFE9] px-3.5 py-1 rounded-full border border-[#D0DED4]">
            Tailored Exterior Solutions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163024]">
            Specialized Care for Every Exterior Surface
          </h1>
          <p className="text-base sm:text-lg text-[#526258] leading-relaxed">
            From low-pressure siding soft washing to spot-free pure water window detailing, explore our exact methods, equipment, and scopes designed specifically for Michigan lakefront properties.
          </p>
        </div>
      </section>

      {/* DETAILED ALTERNATING SERVICE SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {SERVICES_DATA.map((service: ServiceDetail, index: number) => {
          const isReversed = index % 2 !== 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-28"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Column */}
                <div
                  className={`lg:col-span-6 relative ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#E5DFD6]">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      className="w-full h-[380px] sm:h-[460px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#163024]/90 backdrop-blur-xs text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20">
                      {service.badge}
                    </div>

                    {/* Method Snippet */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-xs text-[#1E2823] shadow-md">
                      <div className="flex items-center gap-2 font-bold text-[#163024] mb-1">
                        <Wrench className="w-3.5 h-3.5 text-[#537A67]" />
                        <span>Equipment & Technology</span>
                      </div>
                      <p className="text-[#55665D] leading-normal">
                        {service.equipmentAndMethod}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#163024] text-xs font-semibold">
                      {getServiceIcon(service.iconName)}
                      <span>{service.type}</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163024] leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-base text-[#2C523F] font-serif italic">
                      &ldquo;{service.tagline}&rdquo;
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#4E5E54] leading-relaxed">
                    {service.fullOverview}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {service.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="bg-white p-3.5 rounded-xl border border-[#E4DCD2] shadow-xs"
                      >
                        <span className="text-xs font-bold text-[#163024] block mb-1">
                          {h.title}
                        </span>
                        <span className="text-[11px] text-[#5B6C62] leading-snug block">
                          {h.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Work Covered List */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#73857B]">
                      Work Covered Under This Service:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#313F37]">
                      {service.workCovered.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#537A67] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequency & Action */}
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#E8E1D7]">
                    <div className="text-xs text-[#63756A]">
                      <span className="font-semibold block text-[#163024]">
                        Recommended Frequency:
                      </span>
                      <span>{service.recommendedFrequency}</span>
                    </div>

                    <button
                      onClick={() => onSelectServiceForQuote(service.type)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all hover:translate-y-[-1px] cursor-pointer"
                    >
                      <span>Request {service.type} Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CLOSING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E7DFD4] text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#163024]">
            Need Multiple Services Bundled?
          </h3>
          <p className="text-sm sm:text-base text-[#526359] max-w-xl mx-auto">
            Many lakeshore clients bundle seasonal gutter cleaning with siding soft-washing and streak-free window detailing for complete annual property turnover.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#163024] text-white font-semibold text-sm hover:bg-[#1E3F30] transition-colors cursor-pointer"
            >
              <span>Build a Custom Multi-Service Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
