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
    name: 'Cedar Deck Weathering & Biofilm Treatment',
    category: 'Deck & Patio Care',
    location: 'Grand Rapids, MI',
    description:
      'Demonstration of weathered, oxidized gray cedar rejuvenated to warm, natural wood grain tones using oxygenated wash and botanical neutralizer rinse before sealant application.',
    beforeImg:
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      'Alkaline biological biofilm wash lifting gray oxidation',
      'Controlled low-pressure grain conditioning under 600 PSI',
      'Organic citric brightener balancing wood pH',
    ],
  },
  {
    id: 'hardscapes',
    name: 'Stone Paver & Aggregate Walkway Deep Clean',
    category: 'Hardscapes & Walkways',
    location: 'Holland, MI',
    description:
      'Demonstration of embedded road grime, seasonal pollen, and joint moss lifted from exterior natural stone pavers using dual-orifice rotary spinners.',
    beforeImg:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      'Eco-friendly surfactant pre-treatment',
      'Balanced commercial rotary surface cleaner',
      'Streak-free uniform finish protecting polymeric sand',
    ],
  },
  {
    id: 'siding-windows',
    name: 'Lakeshore Home Siding & Exterior Glass Detailing',
    category: 'Siding & Glass',
    location: 'Saugatuck, MI',
    description:
      'Demonstration of Lake Michigan storm spray and seasonal dust cleared from fiber-cement exterior siding and multi-pane transom glass using 0-PPM pure water pole detailing.',
    beforeImg:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    afterImg:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    treatmentDetails: [
      'Soft-wash siding rinse below 700 PSI protecting seams',
      '4-stage reverse-osmosis deionized glass wash',
      'Spot-free air-dry finish leaving no residue',
    ],
  },
];

export const BeforeAfterShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'matrix'>('visual');
  const [selectedId, setSelectedId] = useState('deck');
  const [sliderPos, setSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const current = SHOWCASE_PROJECTS.find((p) => p.id === selectedId) || SHOWCASE_PROJECTS[0];

  const surfaceMatrix = [
    {
      material: 'Vinyl & Fiber-Cement Siding',
      pressure: '< 800 PSI (Soft Wash)',
      chemistry: 'Biodegradable surfactant & botanical algaecide',
      protection: 'Paint seal, caulking, and underlying moisture barrier preserved',
      frequency: 'Annual Spring / Autumn',
    },
    {
      material: 'Cedar & Treated Wood Decks',
      pressure: '< 600 PSI (Low Flow)',
      chemistry: 'Oxygenated wash + citric acid pH neutralizer',
      protection: 'Zero raised wood fuzz; preps wood evenly for stain absorption',
      frequency: '1-2 Years',
    },
    {
      material: 'Concrete & Exposed Aggregate',
      pressure: '2,500 – 3,000 PSI (Rotary)',
      chemistry: 'Alkaline degreaser & biological soil lifter',
      protection: 'Balanced dual-nozzle spinner prevents wand zebra-striping',
      frequency: 'Annual',
    },
    {
      material: 'Trex & Composite Decking',
      pressure: '< 500 PSI (Gentle Fan)',
      chemistry: 'Manufacturer-approved composite detergent',
      protection: 'Protective polymer cap layer remains completely unmarred',
      frequency: 'Annual',
    },
    {
      material: 'Multi-Pane & Transom Glass',
      pressure: '0 PSI (Pure Water Pole)',
      chemistry: '0-PPM Deionized / reverse-osmosis filtration',
      protection: 'Zero mineral residue, streak-free natural air dry',
      frequency: 'Bi-annual',
    },
  ];

  return (
    <div className="bg-[#F2ECE3] rounded-3xl p-6 sm:p-10 border border-[#E0D6C8] shadow-sm">
      {/* Header & Disclosures */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E2EBE5] text-[#163024] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Surface-Safe Methodology • Demonstration Showcase</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#163024]">
            Calibrated Exterior Care & Transformations
          </h3>
          <p className="text-sm text-[#57655D] mt-1 max-w-xl">
            Compare illustrative exterior restorations and review our material-specific pressure calibration standards designed for Michigan homes.
          </p>
        </div>

        {/* Primary Tabs: Visual vs Matrix */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-white/90 p-1 rounded-xl border border-[#D5CCC0] flex text-xs font-medium">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-[#163024] text-white font-semibold shadow-xs'
                  : 'text-[#4D5C53] hover:text-[#163024]'
              }`}
            >
              Visual Comparisons
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-[#163024] text-white font-semibold shadow-xs'
                  : 'text-[#4D5C53] hover:text-[#163024]'
              }`}
            >
              Surface Calibration Matrix
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <>
          {/* Sub-controls for Visual Comparisons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            {/* Project Selector Tabs */}
            <div className="flex flex-wrap gap-2">
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

            {/* Slider vs Side-by-Side toggle */}
            <div className="bg-white/80 p-1 rounded-lg border border-[#D5CCC0] flex text-xs font-medium">
              <button
                onClick={() => setViewMode('slider')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#163024] text-white font-semibold'
                    : 'text-[#4D5C53] hover:text-[#163024]'
                }`}
              >
                Slider
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'side-by-side'
                    ? 'bg-[#163024] text-white font-semibold'
                    : 'text-[#4D5C53] hover:text-[#163024]'
                }`}
              >
                Side-by-Side
              </button>
            </div>
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
        </>
      ) : (
        /* SURFACE CALIBRATION MATRIX */
        <div className="space-y-4 animate-in fade-in">
          <div className="overflow-x-auto bg-white rounded-2xl border border-[#DCD3C6] shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF7F2] text-[#55675D] font-bold uppercase tracking-wider text-[11px] border-b border-[#E7DFD4]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Material</th>
                  <th className="py-3.5 px-4">Calibrated Pressure</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Target Chemistry</th>
                  <th className="py-3.5 px-4">Substrate Protection</th>
                  <th className="py-3.5 px-4 sm:px-6">Recommended Interval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3]">
                {surfaceMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#163024]">
                      {row.material}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#2C523F]">
                      {row.pressure}
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell text-[#526257]">
                      {row.chemistry}
                    </td>
                    <td className="py-3.5 px-4 text-[#38463E]">
                      {row.protection}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#526257] whitespace-nowrap">
                      {row.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#6B7C71] italic text-right px-2">
            *Standard operating tolerances calibrated to Lake Michigan humidity and seasonal freeze-thaw cycles.
          </p>
        </div>
      )}
    </div>
  );
};
