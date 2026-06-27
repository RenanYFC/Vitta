import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { formatPrice } from '@/mocks/products';
import TrustBar from './TrustBar';
import MiniCartDrawer from './MiniCartDrawer';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Coleção', href: '/colecao' },
  { label: 'Botas', href: '/colecao?categoria=botas' },
  { label: 'Mocassins', href: '/colecao?categoria=mocassins' },
  { label: 'Sobre', href: '/sobre' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartOpen = useCartStore((s) => s.cartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const cartCount = useCartStore((s) => s.getCartCount());
  const wishlistCount = useCartStore((s) => s.wishlist.length);
  
  const products = useProductStore((s) => s.products);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setCartOpen(false);
  }, [location.pathname, location.search, setCartOpen]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    if (searchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const toggleMobile = useCallback(() => setMobileOpen((p) => !p), []);
  const toggleSearch = useCallback(() => setSearchOpen((p) => !p), []);
  const toggleCart = useCallback(() => setCartOpen(!cartOpen), [cartOpen, setCartOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colecao?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Compute suggestions (products and terms) reactively as user types
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return { products: [], terms: [] };
    const q = searchQuery.toLowerCase();
    
    // Filter matching products
    const matchedProducts = products
      .filter((p) => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q))
      .slice(0, 4);

    // Filter matching terms (categories, materials, colors, tags)
    const termsSet = new Set<string>();
    products.forEach((p) => {
      if (p.categoryLabel.toLowerCase().includes(q)) termsSet.add(p.categoryLabel);
      if (p.material.toLowerCase().includes(q)) termsSet.add(p.material);
      if (p.color.toLowerCase().includes(q)) termsSet.add(p.color);
      p.tags.forEach((t) => {
        if (t.toLowerCase().includes(q)) {
          termsSet.add(t.charAt(0).toUpperCase() + t.slice(1));
        }
      });
    });

    return {
      products: matchedProducts,
      terms: Array.from(termsSet).slice(0, 5),
    };
  }, [searchQuery, products]);

  return (
    <>
      <nav className="sticky top-0 z-[100]">
        {/* Trust Bar */}
        <TrustBar />

        {/* Main Navbar */}
        <div className="bg-white h-16 shadow-[0_1px_0_rgba(0,0,0,0.08)]">
          <div className="w-full h-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
            {/* LEFT — Logo */}
            <Link to="/" className="flex items-center leading-none flex-shrink-0">
              <img
                src="https://storage.readdy-site.link/project_files/1a92d057-4aef-472e-902f-0a72a93eadbc/b4648f43-e5e9-4d69-a3be-fdc92ab130f5_Vitta-01.jpg.jpeg?v=cdebadaeb7cd7cc5998b437d0aceae2a"
                alt="Vitta Calçados"
                className="h-12 max-h-[48px] w-auto object-contain"
              />
            </Link>

            {/* CENTER — Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm text-[#444444] hover:text-teal transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* RIGHT — Icon group */}
            <div className="flex items-center gap-4">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream/60 transition-colors cursor-pointer"
                onClick={toggleSearch}
                aria-label="Buscar"
              >
                <i className="ri-search-line text-[20px] text-teal" />
              </button>
              <Link
                to="/favoritos"
                className="hidden md:flex w-8 h-8 items-center justify-center rounded-md hover:bg-cream/60 transition-colors relative"
                aria-label="Favoritos"
              >
                <i className="ri-heart-line text-[20px] text-teal" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-lavender text-white text-[10px] font-body font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/conta"
                className="hidden md:flex w-8 h-8 items-center justify-center rounded-md hover:bg-cream/60 transition-colors"
                aria-label="Minha conta"
              >
                <i className="ri-user-line text-[20px] text-teal" />
              </Link>
              <button
                onClick={toggleCart}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream/60 transition-colors relative cursor-pointer"
                aria-label="Carrinho"
              >
                <i className="ri-shopping-bag-line text-[20px] text-teal" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-lavender text-white text-[10px] font-body font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream/60 transition-colors cursor-pointer"
                onClick={toggleMobile}
                aria-label="Menu"
              >
                <i className="ri-menu-line text-[20px] text-teal" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-sm flex items-start justify-center pt-28 md:pt-36 overflow-y-auto">
          <div className="w-full max-w-2xl px-4 pb-20">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border-b-2 border-teal pb-3">
              <i className="ri-search-line text-2xl text-teal" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, cor, material..."
                className="flex-1 bg-transparent font-body text-xl text-brand-text placeholder:text-brand-muted outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={toggleSearch}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-cream transition-colors cursor-pointer"
                aria-label="Fechar busca"
              >
                <i className="ri-close-line text-2xl text-brand-text" />
              </button>
            </form>
            <p className="mt-2 font-body text-xs text-brand-secondary">
              Pressione Enter para buscar ou ESC para fechar
            </p>

            {/* Suggestions Panel */}
            <div className="mt-8 flex flex-col gap-6">
              
              {/* Row 1 — Terms Line */}
              <div>
                <h4 className="font-body text-xs font-bold tracking-wider uppercase text-brand-muted mb-3">
                  {!searchQuery.trim() ? 'Buscas Populares' : 'Termos Relacionados'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {!searchQuery.trim() ? (
                    ['Botas', 'Sandálias', 'Oxfords', 'Sapatos', 'Couro Legítimo'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          navigate(`/colecao?busca=${encodeURIComponent(term)}`);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="font-body text-xs text-brand-secondary hover:text-teal font-medium px-4 py-2 rounded-full border border-brand-border/50 bg-white hover:border-teal hover:bg-cream/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <i className="ri-search-line text-[10px]" />
                        {term}
                      </button>
                    ))
                  ) : suggestions.terms.length > 0 ? (
                    suggestions.terms.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          navigate(`/colecao?busca=${encodeURIComponent(term)}`);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="font-body text-xs text-brand-secondary hover:text-teal font-medium px-4 py-2 rounded-full border border-brand-border/50 bg-white hover:border-teal hover:bg-cream/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <i className="ri-search-line text-[10px]" />
                        {term}
                      </button>
                    ))
                  ) : (
                    <span className="font-body text-xs text-brand-muted">
                      Nenhum termo relacionado encontrado
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2 — Products Line (Each product in a separate row / vertical stack) */}
              <div className="border-t border-brand-border/40 pt-6">
                <h4 className="font-body text-xs font-bold tracking-wider uppercase text-brand-muted mb-4">
                  {!searchQuery.trim() ? 'Destaques' : 'Produtos Sugeridos'}
                </h4>
                <div className="flex flex-col gap-3">
                  {!searchQuery.trim() ? (
                    products.slice(0, 4).map((p) => (
                      <Link
                        key={p.id}
                        to={`/produto/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-cream/30 transition-colors border border-brand-border/20 bg-white/40 group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-14 h-14 object-contain bg-cream rounded-md flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-body text-sm font-semibold text-brand-text truncate group-hover:text-teal transition-colors">
                              {p.name}
                            </p>
                            <p className="font-body text-xs text-brand-secondary mt-0.5 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                              {p.shortDesc}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-4">
                          <p className="font-display text-sm text-teal font-semibold">
                            {formatPrice(p.price)}
                          </p>
                          <span className="font-body text-[10px] text-brand-muted block mt-0.5">
                            Ver detalhes
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : suggestions.products.length > 0 ? (
                    suggestions.products.map((p) => (
                      <Link
                        key={p.id}
                        to={`/produto/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-cream/30 transition-colors border border-brand-border/20 bg-white/40 group"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-14 h-14 object-contain bg-cream rounded-md flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-body text-sm font-semibold text-brand-text truncate group-hover:text-teal transition-colors">
                              {p.name}
                            </p>
                            <p className="font-body text-xs text-brand-secondary mt-0.5 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                              {p.shortDesc}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-4">
                          <p className="font-display text-sm text-teal font-semibold">
                            {formatPrice(p.price)}
                          </p>
                          <span className="font-body text-[10px] text-brand-muted block mt-0.5">
                            Ver detalhes
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="py-4 font-body text-sm text-brand-secondary">
                      Nenhum produto sugerido para "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Mobile full-screen overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-white pt-28 px-8">
          <button
            onClick={toggleMobile}
            className="absolute top-20 right-6 w-10 h-10 flex items-center justify-center rounded-md hover:bg-cream cursor-pointer"
            aria-label="Fechar menu"
          >
            <i className="ri-close-line text-2xl text-brand-text" />
          </button>
          <div className="flex flex-col gap-8 mt-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-3xl text-brand-text hover:text-teal transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-brand-border space-y-4">
            <Link
              to="/favoritos"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 font-body text-lg text-brand-text hover:text-teal transition-colors"
            >
              <i className="ri-heart-line text-xl text-teal" />
              Favoritos {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link
              to="/conta"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 font-body text-lg text-brand-text hover:text-teal transition-colors"
            >
              <i className="ri-user-line text-xl text-teal" />
              Minha Conta
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                setCartOpen(true);
              }}
              className="flex items-center gap-3 font-body text-lg text-brand-text cursor-pointer"
            >
              <i className="ri-shopping-bag-line text-xl text-teal" />
              Carrinho {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
          <div className="mt-10 pt-6 border-t border-brand-border">
            <p className="font-body text-xs text-brand-secondary mb-3">Atendimento</p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream"
                aria-label="WhatsApp"
              >
                <i className="ri-whatsapp-line text-lg text-whatsapp" />
              </a>
              <a
                href="https://www.instagram.com/vitta_calcados20/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg text-brand-text" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mini Cart Drawer */}
      <MiniCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}