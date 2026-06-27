import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/base/ProductCard';
import QuickViewModal from '@/components/feature/QuickViewModal';
import ScrollToTop from '@/components/feature/ScrollToTop';
import type { Product } from '@/mocks/products';
import { categories, formatPrice } from '@/mocks/products';
import { useProductStore } from '@/store/useProductStore';

export default function Collection() {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);

  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('categoria');

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'todos');

  // Sync state with URL category when it changes
  useEffect(() => {
    setSelectedCategory(urlCategory || 'todos');
  }, [urlCategory]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('relevancia');

  const allSizes = ['34', '35', '36', '37', '38', '39', '40', '41'];
  const allColors = useMemo(() => [...new Set(products.map((p) => p.color))], [products]);
  const allMaterials = useMemo(() => [...new Set(products.map((p) => p.material))], [products]);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    let result = [...products];

    // Filter by search query from URL parameter
    const urlSearch = searchParams.get('busca');
    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== 'todos') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.size) && v.stock > 0),
      );
    }

    result = result.filter(
      (p) => p.price / 100 >= priceRange[0] && p.price / 100 <= priceRange[1],
    );

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    if (sortOption === 'preco-menor') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'preco-maior') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'mais-novos') {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [products, selectedCategory, selectedSizes, priceRange, selectedColors, selectedMaterials, sortOption, searchParams]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material],
    );
  };

  const clearAllFilters = useCallback(() => {
    setSelectedCategory('todos');
    setSelectedSizes([]);
    setPriceRange([0, 600]);
    setSelectedColors([]);
    setSelectedMaterials([]);
  }, []);

  const hasActiveFilters =
    selectedCategory !== 'todos' ||
    selectedSizes.length > 0 ||
    priceRange[1] < 600 ||
    selectedColors.length > 0 ||
    selectedMaterials.length > 0;

  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (selectedCategory !== 'todos') {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) {
        chips.push({
          label: cat.name,
          onRemove: () => setSelectedCategory('todos'),
        });
      }
    }
    selectedSizes.forEach((size) => {
      chips.push({
        label: `Tam ${size}`,
        onRemove: () =>
          setSelectedSizes((prev) => prev.filter((s) => s !== size)),
      });
    });
    selectedColors.forEach((color) => {
      chips.push({
        label: color,
        onRemove: () =>
          setSelectedColors((prev) => prev.filter((c) => c !== color)),
      });
    });
    selectedMaterials.forEach((material) => {
      chips.push({
        label: material,
        onRemove: () =>
          setSelectedMaterials((prev) =>
            prev.filter((m) => m !== material),
          ),
      });
    });
    if (priceRange[1] < 600) {
      chips.push({
        label: `Até ${formatPrice(priceRange[1] * 100)}`,
        onRemove: () => setPriceRange([0, 600]),
      });
    }
    return chips;
  }, [selectedCategory, selectedSizes, selectedColors, selectedMaterials, priceRange]);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (loading || !products || products.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body text-sm text-brand-secondary">Carregando coleção...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pt-8 md:pt-12">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">
            Início
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text">Coleção</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl text-brand-text mb-2">
          Nossa Coleção
        </h1>
        <p className="font-body text-sm text-brand-secondary mb-6">
          Exibindo {filteredProducts.length} modelos
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-text mb-3">
                  Categoria
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCategory('todos')}
                    className={`text-left font-body text-sm transition-colors cursor-pointer ${
                      selectedCategory === 'todos'
                        ? 'text-teal font-medium'
                        : 'text-brand-secondary hover:text-brand-text'
                    }`}
                  >
                    Todas
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-left font-body text-sm transition-colors cursor-pointer ${
                        selectedCategory === cat.slug
                          ? 'text-teal font-medium'
                          : 'text-brand-secondary hover:text-brand-text'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-text mb-3">
                  Tamanho
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-full aspect-square flex items-center justify-center rounded-sm text-xs font-body font-medium transition-all cursor-pointer ${
                        selectedSizes.includes(size)
                          ? 'bg-teal text-white'
                          : 'border border-brand-border text-brand-text hover:border-teal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-text mb-3">
                  Preço
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body text-xs text-brand-secondary">
                    {formatPrice(priceRange[0] * 100)}
                  </span>
                  <span className="font-body text-xs text-brand-muted">-</span>
                  <span className="font-body text-xs text-brand-secondary">
                    {formatPrice(priceRange[1] * 100)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="600"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-teal"
                />
              </div>

              {/* Color */}
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-text mb-3">
                  Cor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1.5 rounded-full font-body text-xs transition-all cursor-pointer ${
                        selectedColors.includes(color)
                          ? 'bg-teal text-white'
                          : 'bg-cream text-brand-text hover:bg-cream-dark border border-brand-border'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="font-body text-sm font-semibold text-brand-text mb-3">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allMaterials.map((material) => (
                    <button
                      key={material}
                      onClick={() => toggleMaterial(material)}
                      className={`px-3 py-1.5 rounded-full font-body text-xs transition-all cursor-pointer ${
                        selectedMaterials.includes(material)
                          ? 'bg-teal text-white'
                          : 'bg-cream text-brand-text hover:bg-cream-dark border border-brand-border'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-body text-sm text-brand-secondary">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'modelo' : 'modelos'}
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="font-body text-xs text-teal hover:underline cursor-pointer"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-body text-sm text-brand-secondary hidden sm:inline">
                  Ordenar:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-2 rounded-md border border-brand-border bg-white font-body text-sm text-brand-text outline-none focus:border-teal cursor-pointer"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="preco-menor">Menor preço</option>
                  <option value="preco-maior">Maior preço</option>
                  <option value="mais-novos">Mais novos</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterChips.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="font-body text-xs text-brand-secondary">
                  Filtros ativos:
                </span>
                {activeFilterChips.map((chip, idx) => (
                  <button
                    key={`${chip.label}-${idx}`}
                    onClick={chip.onRemove}
                    className="flex items-center gap-1 px-2.5 py-1 bg-teal/10 text-teal rounded-full font-body text-xs hover:bg-teal/20 transition-colors cursor-pointer"
                  >
                    {chip.label}
                    <i className="ri-close-line" />
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ rowGap: '40px', columnGap: '24px' }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <i className="ri-search-line text-4xl text-brand-muted mb-4" />
                <p className="font-body text-lg text-brand-secondary">
                  Nenhum produto encontrado com esses filtros.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSelectedSizes([]);
                    setPriceRange([0, 600]);
                    setSelectedColors([]);
                    setSelectedMaterials([]);
                  }}
                  className="mt-4 font-body text-sm text-teal hover:underline cursor-pointer"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-center mt-10 gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream cursor-pointer">
                  <i className="ri-arrow-left-s-line" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-teal font-body text-sm text-white cursor-pointer">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream cursor-pointer">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream cursor-pointer">
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}