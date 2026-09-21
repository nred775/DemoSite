import React from 'react';
import { ArrowRight, Check, Droplets, Sparkles, ShieldAlert, SunMedium } from 'lucide-react';
import { ServiceDetail } from '../data/servicesData';
import { ServiceType } from '../types';

interface ServiceCardProps {
  service: ServiceDetail;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
  onViewServiceDetails: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectServiceForQuote,
  onViewServiceDetails,
}) => {
  const renderIcon = () => {
    switch (service.iconName) {
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
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E7E0D6] shadow-xs hover:shadow-md transition-all flex flex-col group hover:border-[#163024]/30">
      {/* Photo Header */}
      <div className="relative h-56 w-full overflow-hidden bg-[#E9E4DC]">
        <img
          src={service.imageUrl}
          alt={service.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badge & Icon */}
        <div className="absolute top-3 left-3 bg-[#163024]/90 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-white/10">
          {service.badge}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="font-serif text-lg font-bold drop-shadow-xs">
            {service.title}
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#163024]/80 flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <p className="text-sm text-[#4C5B52] leading-relaxed">
            {service.description}
          </p>

          <div className="mt-4 pt-4 border-t border-[#F0EBE3] space-y-2">
            <span className="text-[11px] font-semibold text-[#809187] uppercase tracking-wider block">
              What’s Included:
            </span>
            <ul className="space-y-1.5 text-xs text-[#313E37]">
              {service.workCovered.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#537A67] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#F0EBE3] flex items-center gap-2">
          <button
            onClick={() => onSelectServiceForQuote(service.type)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#163024] hover:bg-[#1C3D2E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Quote {service.type}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onViewServiceDetails}
            className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9E0] text-[#334239] text-xs font-semibold border border-[#DCD3C6] transition-colors cursor-pointer"
            title="View full service specifications"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
