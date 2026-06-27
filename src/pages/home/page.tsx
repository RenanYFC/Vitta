import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/feature/HeroSection';
import FilterBar from '@/components/feature/FilterBar';
import ProductCard from '@/components/base/ProductCard';
import SectionTitle from '@/components/base/SectionTitle';
import AnimatedSection from '@/components/feature/AnimatedSection';
import { formatPrice } from '@/mocks/products';
import { useProductStore } from '@/store/useProductStore';

export default function Home() {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [sortOption, setSortOption] = useState('relevancia');

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    let result = [...products];

    // Apply filter
    if (activeFilter === 'botas') {
      result = result.filter((p) => p.category === 'botas');
    } else if (activeFilter === 'oxfords') {
      result = result.filter((p) => p.category === 'oxfords');
    } else if (activeFilter === 'sandalias') {
      result = result.filter((p) => p.category === 'sandalias');
    } else if (activeFilter === 'sapatos') {
      result = result.filter((p) => p.category === 'sapatos');
    } else if (activeFilter === 'couro') {
      result = result.filter((p) => p.tags.includes('couro'));
    } else if (activeFilter === 'couro-legitimo') {
      result = result.filter((p) => p.tags.includes('couro-legitimo') || p.tags.includes('couro'));
    } else if (activeFilter === 'ate-300') {
      result = result.filter((p) => p.price <= 30000);
    } else if (activeFilter === 'lancamentos') {
      result = result.filter((p) => p.badge === 'novo' || p.badge === 'new');
    }

    // Apply sort
    if (sortOption === 'preco-menor') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'preco-maior') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'mais-novos') {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [products, activeFilter, sortOption]);

  if (loading || !products || products.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body text-sm text-brand-secondary">Carregando catálogo...</span>
        </div>
      </div>
    );
  }

  const featuredProduct = products[0];

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero */}
      <HeroSection />

      {/* Filter bar */}
      <AnimatedSection animation="fade-in-up" delay={100}>
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortOption={sortOption}
          onSortChange={setSortOption}
          productCount={filteredProducts.length}
        />
      </AnimatedSection>

      {/* Product Grid */}
      <AnimatedSection animation="fade-in-up" delay={200}>
        <section className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ rowGap: '40px', columnGap: '24px' }}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 80}ms`, animationFillMode: 'forwards' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-lg text-brand-secondary">
                Nenhum produto encontrado para este filtro.
              </p>
              <button
                onClick={() => setActiveFilter('todos')}
                className="mt-4 font-body text-sm text-teal hover:underline cursor-pointer"
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </section>
      </AnimatedSection>

      {/* Featured section */}
      <section className="w-full bg-cream">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <AnimatedSection className="flex-1" delay={0} animation="fade-in-up">
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="w-full aspect-[4/5] object-cover object-top rounded-lg"
              />
            </AnimatedSection>
            <AnimatedSection className="flex-1 max-w-lg" delay={150} animation="fade-in-up">
              <SectionTitle
                label="Destaque da Semana"
                title={
                  <>
                    Bota Baixa
                    <br />
                    <em className="text-teal">em Couro</em>
                  </>
                }
                subtitle="Couro legítimo brasileiro com acabamento artesanal impecável. A bota que combina elegância e conforto para o dia a dia."
              />
              <div className="flex items-center gap-3 mt-5">
                <span className="font-display text-2xl text-teal font-semibold">
                  {formatPrice(featuredProduct.price)}
                </span>
              </div>
              <Link to={`/produto/${featuredProduct.slug}`} className="inline-block mt-6">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white font-body text-base font-medium rounded-md hover:bg-teal-dark transition-colors whitespace-nowrap cursor-pointer">
                  Ver Detalhes
                  <i className="ri-arrow-right-line" />
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="px-4 md:px-8 lg:px-12">
          <AnimatedSection animation="fade-in-up" delay={0}>
            <SectionTitle
              title="Por que escolher Vitta?"
              subtitle="Tradição artesanal brasileira com design contemporâneo"
              centered
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-14">
            {[
              {
                icon: 'ri-leaf-line',
                title: 'Couro Legítimo',
                desc: '100% couro brasileiro selecionado dos melhores curtumes certificados.',
              },
              {
                icon: 'ri-heart-3-line',
                title: 'Conforto Real',
                desc: 'Palmilhas anatômicas com espuma de memória para você usar o dia todo.',
              },
              {
                icon: 'ri-vip-crown-line',
                title: 'Elegância Acessível',
                desc: 'Design sofisticado com preços justos. Luxo que cabe no seu bolso.',
              },
            ].map((item, index) => (
              <AnimatedSection
                key={item.title}
                animation="fade-in-up"
                delay={150 + index * 120}
              >
                <div className="bg-cream rounded-lg p-6 md:p-8 text-center h-full">
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-4">
                    <i className={`${item.icon} text-2xl text-teal`} />
                  </div>
                  <h3 className="font-display text-xl text-brand-text mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-brand-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <AnimatedSection animation="fade-in-up" delay={0}>
        <section className="w-full bg-teal py-16 md:py-20">
          <div className="px-4 md:px-8 lg:px-12 text-center max-w-xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-white">
              Rebaixas exclusivas por e-mail
            </h2>
            <p className="font-body text-base text-white/80 mt-3">
              Cadastre-se e receba 10% OFF na primeira compra
            </p>
            <form
              className="flex flex-col sm:flex-row items-center gap-3 mt-7"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 w-full px-5 py-3.5 rounded-md bg-white/10 border border-white/20 text-white font-body text-sm placeholder:text-white/50 outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-teal font-body text-sm font-semibold rounded-md hover:bg-cream transition-colors whitespace-nowrap cursor-pointer"
              >
                Quero meu desconto
              </button>
            </form>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
