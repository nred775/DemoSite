import React, { useState } from 'react';
import { Filter, Sparkles, MapPin, CheckCircle2, ArrowRight, X, ExternalLink } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolioData';
import { PageView, ServiceType } from '../types';

interface OurWorkPageProps {
  onNavigate: (page: PageView) => void;
  onSelectServiceForQuote: (serviceType: ServiceType) => void;
}

type FilterCategory = 'All Projects' | 'Pressure Washing' | 'Windows' | 'Gutters' | 'Decks & Patios';

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All Projects');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories: FilterCategory[] = [
    'All Projects',
    'Pressure Washing',
    'Windows',
    'Gutters',
    'Decks & Patios',
  ];

  const filteredItems = activeCategory === 'All Projects'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const mapCategoryToService = (cat: string): ServiceType => {
    switch (cat) {
      case 'Windows':
        return 'Window Cleaning';
      case 'Gutters':
        return 'Gutter Cleaning';
      case 'Decks & Patios':
        return 'Deck & Patio Cleaning';
      default:
        return 'Pressure Washing';
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* HEADER WITH DISCLOSURE */}
      <section className="bg-[#FAF7F2] border-b border-[#E8E1D7] pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E8EFE9] text-[#163024] border border-[#CFDFD4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Illustrative Demonstration Portfolio</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#163024]">
            Demonstrated Property Transformations
          </h1>

          <p className="text-base sm:text-lg text-[#526359] leading-relaxed">
            Browse illustrative projects showcasing our exterior care techniques across Michigan shoreline properties.
          </p>

          {/* Explicit Portfolio Disclosure Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#F0EBE2] border border-[#DDD5C9] text-xs text-[#57685E] max-w-xl mx-auto text-left flex items-start gap-3">
            <span className="font-bold text-[#163024] shrink-0 text-sm">Notice:</span>
            <p>
              These illustrative project examples and photography represent simulated residential and commercial scopes. They demonstrate site design and project cataloging capabilities rather than actual past customer contracts.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => {
            const count =
              cat === 'All Projects'
                ? PORTFOLIO_ITEMS.length
                : PORTFOLIO_ITEMS.filter((item) => item.category === cat).length;

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#163024] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F2EDE5] text-[#3D4C44] border border-[#DDD5C9]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#2A523E] text-[#A3E6BA]' : 'bg-[#EAE4DC] text-[#4E5E55]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E7DFD4] shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between hover:border-[#163024]/40"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#E2DBD1]">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#163024]/90 text-white backdrop-blur-xs">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/50 text-[#E0ECE5] backdrop-blur-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#A3E6BA]" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-[#A3E6BA] uppercase tracking-wider block">
                      {item.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold leading-snug drop-shadow-xs">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-[#4E5E55] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-[#F0EBE3]">
                    {item.keyDetails.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#303E36]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#537A67] shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-[#163024] group-hover:text-[#285741] transition-colors">
                <span>View project scope specs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E4DCD3] overflow-hidden text-[#1E2823] max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-[#DCD3C6] shrink-0">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 p-1.5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A3E6BA] text-[#0F261C]">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-[#D8E4DC] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A3E6BA]" />
                    <span>{selectedProject.location}</span>
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#73857B] mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-[#4E5E55] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#73857B] mb-2">
                  Key Technical Execution Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {selectedProject.keyDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E7DFD4]">
                      <CheckCircle2 className="w-4 h-4 text-[#537A67] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E8EFE9] border border-[#D0DED4] text-xs text-[#2A4B3A]">
                <strong>Portfolio Disclosure:</strong> This project card illustrates how completed exterior projects can be showcased with rich metadata and high-resolution photo documentation.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 bg-[#F3ECE2] border-t border-[#E4DCD3] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-4 py-2 text-sm text-[#506056] hover:text-[#163024] cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  const service = mapCategoryToService(selectedProject.category);
                  setSelectedProject(null);
                  onSelectServiceForQuote(service);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#163024] hover:bg-[#1E3F30] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Request Similar Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
