import React from 'react';
import { Gauge, Sparkles, Leaf, CalendarClock } from 'lucide-react';

export const ServiceHighlightStrip: React.FC = () => {
  const highlights = [
    {
      icon: Gauge,
      title: 'Surface-Calibrated Pressure',
      desc: 'Gentle low-pressure (<800 PSI) soft washing preserves siding, paint, and mortar.',
    },
    {
      icon: Sparkles,
      title: '0-PPM Pure Water Rinse',
      desc: '4-stage reverse-osmosis filtration leaves glass spotless without residue.',
    },
    {
      icon: Leaf,
      title: 'Eco-Safe Detergents',
      desc: 'Biodegradable botanical solutions safe for Michigan plants, turf, and pets.',
    },
    {
      icon: CalendarClock,
      title: 'Reliable Scheduling',
      desc: 'Clear communication, punctual arrival windows, and thorough job-site cleanup.',
    },
  ];

  return (
    <section className="bg-white border-y border-[#E9E2D8] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E8EFE9] text-[#163024] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#163024]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#163024] text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#57655D] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
