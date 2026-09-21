import React, { useState } from 'react';
import { Eye, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShowcaseProject {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  treatmentDetails: string[];
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'deck',
    name: 'Cedar Deck Weathering & Mold Restoration',
    category: 'Deck & Patio Cleaning',
    location: 'Grand Rapids, MI',
    description:
      'Illustrative comparison showing weathered, slippery gray wood revived to warm, natural cedar tones via oxygenated wash and neutralizer rinse before seal-coat.',
    beforeImg:
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      'Alkaline biological film removal',
      'Gentle wood conditioning under 600 PSI',
      'Citric brightener restores natural wood pH',
    ],
  },
  {
    id: 'driveway',
    name: 'Exposed Aggregate Siding & Walkway Wash',
    category: 'Pressure Washing',
    location: 'Holland, MI',
    description:
      'Illustrative comparison demonstrating elimination of Michigan winter road grime, embedded soil, and moss joints using rotary flat-surface cleaners.',
    beforeImg:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      'Pre-treatment with organic surfactant',
      'Dual-nozzle commercial rotary spinner',
      'Uniform finish with zero wand zebra stripes',
    ],
  },
  {
    id: 'windows',
    name: 'Lake Shore Glass & Screen Detailing',
    category: 'Window Cleaning',
    location: 'Saugatuck, MI',
    description:
      'Demonstration of salt spray, lake pollen, and moisture haze cleared with 0-PPM deionized water feed, leaving clear crystal reflections.',
    beforeImg:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      '4-stage reverse-osmosis filtration',
      'Track and sill deep vacuuming',
      'Natural spotless air-dry with zero residue',
    ],
  },
];

export const BeforeAfterShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState('deck');
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const current = SHOWCASE_PROJECTS.find((p) => p.id === selectedId) || SHOWCASE_PROJECTS[0];

  return (
    <div className="bg-[#F2ECE3] rounded-3xl p-6 sm:p-10 border border-[#E0D6C8] shadow-sm">
      {/* Header & Disclosures */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E2EBE5] text-[#163024] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Demonstration Showcase • Illustrative Comparison</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#163024]">
            See the Difference: Exterior Transformations
          </h3>
          <p className="text-sm text-[#57655D] mt-1 max-w-xl">
            Compare illustrative before-and-after results illustrating our surface-safe restoration methods for wood, glass, and hardscapes.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-white/80 p-1 rounded-lg border border-[#D5CCC0] flex text-xs font-medium">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-[#163024] text-white font-semibold'
                  : 'text-[#4D5C53] hover:text-[#163024]'
              }`}
            >
              Interactive Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-[#163024] text-white font-semibold'
                  : 'text-[#4D5C53] hover:text-[#163024]'
              }`}
            >
              Side-by-Side
            </button>
          </div>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SHOWCASE_PROJECTS.map((proj) => (
          <button
            key={proj.id}
            onClick={() => {
              setSelectedId(proj.id);
              setSliderPos(50);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedId === proj.id
                ? 'bg-[#163024] text-white shadow-xs'
                : 'bg-white/90 text-[#3C4A42] hover:bg-white border border-[#DDD5C9]'
            }`}
          >
            {proj.category}
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      {viewMode === 'slider' ? (
        <div className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden shadow-lg border border-[#DCD3C6] select-none group">
          {/* AFTER Image (Full background) */}
          <img
            src={current.afterImg}
            alt={`After: ${current.name}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <img
              src={current.beforeImg}
              alt={`Before: ${current.name}`}
              className="absolute inset-0 w-full h-full object-cover filter brightness-90"
              loading="lazy"
            />
          </div>

          {/* Dividing Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-[#163024] text-white flex items-center justify-center shadow-xl border-2 border-white text-xs font-bold">
              ↔
            </div>
          </div>

          {/* Slider range input overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
            aria-label="Drag to compare before and after"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#163024]/85 text-white backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Before Wash
          </div>
          <div className="absolute top-4 right-4 z-10 pointer-events-none bg-[#A3E6BA] text-[#0F261C] backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            After Restoration
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none bg-[#0E1E17]/85 backdrop-blur-md text-white p-3 sm:p-4 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-[#A3E6BA] block sm:inline mr-2">
                {current.name} • {current.location}
              </span>
              <span className="text-[#D3DFD7]">Drag slider horizontally to compare</span>
            </div>
            <span className="text-[11px] text-[#A0B5A8] italic">
              *Illustrative portfolio concept photography
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 border border-[#DCD3C6] shadow-xs">
            <img
              src={current.beforeImg}
              alt="Before restoration illustrative photo"
              className="w-full h-full object-cover filter brightness-95"
            />
            <span className="absolute top-3 left-3 bg-[#163024]/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Before Care
            </span>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 border border-[#DCD3C6] shadow-xs">
            <img
              src={current.afterImg}
              alt="After restoration illustrative photo"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 right-3 bg-[#A3E6BA] text-[#0F261C] text-xs px-3 py-1 rounded-full font-bold shadow-xs">
              After Care
            </span>
          </div>
        </div>
      )}

      {/* Treatment Method Bullet Strip */}
      <div className="mt-6 pt-6 border-t border-[#DFD5C6] grid grid-cols-1 sm:grid-cols-3 gap-4">
        {current.treatmentDetails.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#38463E]">
            <CheckCircle2 className="w-4 h-4 text-[#537A67] shrink-0 mt-0.5" />
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
