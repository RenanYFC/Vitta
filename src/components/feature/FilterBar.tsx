import { useState, memo } from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  productCount?: number;
}

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'botas', label: 'Botas' },
  { id: 'coturnos', label: 'Coturnos' },
  { id: 'mocassins', label: 'Mocassins' },
  { id: 'couro-legitimo', label: 'Couro Legítimo' },
  { id: 'ate-300', label: 'Até R$300' },
  { id: 'lancamentos', label: 'Lançamentos' },
];

const sortOptions = [
  { id: 'relevancia', label: 'Relevância' },
  { id: 'preco-menor', label: 'Menor preço' },
  { id: 'preco-maior', label: 'Maior preço' },
  { id: 'mais-novos', label: 'Mais novos' },
];

const FilterBar = memo(function FilterBar({
  activeFilter,
  onFilterChange,
  sortOption,
  onSortChange,
  productCount,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-[#EEEBE4]">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-teal text-white'
                    : 'bg-cream text-brand-text hover:bg-cream-dark border border-brand-border'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {productCount !== undefined && (
              <span className="font-body text-xs text-brand-secondary hidden md:inline">
                {productCount} modelos
              </span>
            )}
            <div className="relative">
              <button
                onClick={() => setSortOpen((p) => !p)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream transition-colors cursor-pointer"
              >
                {sortOptions.find((s) => s.id === sortOption)?.label || 'Ordenar'}
                <i className="ri-arrow-down-s-line text-brand-secondary" />
              </button>
              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-white border border-brand-border rounded-lg shadow-lg z-50 py-1 min-w-[180px]">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onSortChange(opt.id);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 font-body text-sm transition-colors cursor-pointer ${
                          sortOption === opt.id
                            ? 'bg-cream text-teal font-medium'
                            : 'text-brand-text hover:bg-cream'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FilterBar;