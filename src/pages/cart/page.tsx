import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/mocks/products';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getCartTotal = useCartStore((s) => s.getCartTotal);

  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [cepError, setCepError] = useState(false);

  const subtotal = useMemo(() => getCartTotal(), [items, getCartTotal]);

  const handleCalculateShipping = () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError(true);
      setTimeout(() => setCepError(false), 2000);
      return;
    }
    setCalculatingShipping(true);
    setCepError(false);
    // Simulação de cálculo de frete
    setTimeout(() => {
      setShippingCost(cleanCep.startsWith('0') ? 1990 : cleanCep.startsWith('1') ? 2490 : 3490);
      setCalculatingShipping(false);
    }, 800);
  };

  const total = shippingCost ? subtotal + shippingCost : subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white pt-6 md:pt-10">
        <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 text-center">
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-cream mb-6">
            <i className="ri-shopping-bag-line text-3xl text-brand-muted" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-brand-text mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="font-body text-sm text-brand-secondary max-w-sm mx-auto mb-8">
            Explore nossa coleção e encontre o par perfeito para você.
          </p>
          <Link to="/colecao">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white font-body text-base font-medium rounded-md hover:bg-teal-dark transition-colors whitespace-nowrap">
              Ver Coleção
              <i className="ri-arrow-right-line" />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pt-6 md:pt-10">
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">
            Início
          </Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text">Carrinho</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl text-brand-text mb-6">
          Seu Carrinho
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product List */}
          <div className="flex-1">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-start gap-4 bg-white rounded-lg p-4 border border-brand-border"
                >
                  <Link
                    to={`/produto/${item.product.slug}`}
                    className="w-24 h-28 flex-shrink-0 rounded-md overflow-hidden bg-cream"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/produto/${item.product.slug}`}>
                          <h3 className="font-body text-sm font-medium text-brand-text hover:text-teal transition-colors leading-tight">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="font-body text-xs text-brand-secondary mt-0.5">
                          Tamanho: {item.size}
                        </p>
                        <p className="font-body text-xs text-brand-secondary">
                          {item.product.material}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.size)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-cream transition-colors cursor-pointer flex-shrink-0"
                        aria-label="Remover item"
                      >
                        <i className="ri-delete-bin-line text-brand-secondary" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-sm border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream transition-colors cursor-pointer"
                          aria-label="Diminuir quantidade"
                        >
                          <i className="ri-subtract-line text-xs" />
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center font-body text-sm text-brand-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-sm border border-brand-border bg-white font-body text-sm text-brand-text hover:bg-cream transition-colors cursor-pointer"
                          aria-label="Aumentar quantidade"
                        >
                          <i className="ri-add-line text-xs" />
                        </button>
                      </div>
                      <span className="font-display text-base text-teal font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 border border-brand-border sticky top-24">
              <h2 className="font-body text-lg font-semibold text-brand-text mb-5">
                Resumo do Pedido
              </h2>

              {/* CEP input */}
              <div className="mb-5">
                <label className="font-body text-xs font-medium text-brand-text mb-1.5 block">
                  Calcular frete (CEP)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length > 5) {
                        val = val.slice(0, 5) + '-' + val.slice(5, 8);
                      }
                      setCep(val);
                      setCepError(false);
                    }}
                    maxLength={9}
                    className={`flex-1 px-3 py-2.5 rounded-md border font-body text-sm outline-none transition-colors ${
                      cepError
                        ? 'border-[#C8553D] focus:border-[#C8553D]'
                        : 'border-brand-border focus:border-teal'
                    }`}
                  />
                  <button
                    onClick={handleCalculateShipping}
                    disabled={calculatingShipping}
                    className="px-4 py-2.5 bg-cream text-teal font-body text-sm font-medium rounded-md hover:bg-cream-dark transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    {calculatingShipping ? (
                      <i className="ri-loader-4-line animate-spin" />
                    ) : (
                      'Calcular'
                    )}
                  </button>
                </div>
                {cepError && (
                  <p className="font-body text-xs text-[#C8553D] mt-1">
                    Digite um CEP válido (8 dígitos)
                  </p>
                )}
              </div>

              {/* Summary lines */}
              <div className="space-y-3 mb-5 pb-5 border-b border-brand-border">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-brand-secondary">
                    Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{' '}
                    {items.reduce((s, i) => s + i.quantity, 0) === 1
                      ? 'item'
                      : 'itens'}
                    )
                  </span>
                  <span className="font-body text-sm text-brand-text">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-brand-secondary">
                    Frete
                  </span>
                  {shippingCost !== null ? (
                    <span className="font-body text-sm text-brand-text">
                      {formatPrice(shippingCost)}
                    </span>
                  ) : (
                    <span className="font-body text-sm text-brand-muted">
                      A calcular
                    </span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-base font-semibold text-brand-text">
                  Total
                </span>
                <span className="font-display text-xl text-teal font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Link to="/checkout" className="block">
                  <span className="w-full py-4 bg-teal text-white font-body text-base font-semibold rounded-md hover:bg-teal-dark transition-colors flex items-center justify-center cursor-pointer">
                    Finalizar Compra
                  </span>
                </Link>
                <Link to="/colecao" className="block">
                  <span className="w-full py-4 bg-white border border-brand-border text-brand-text font-body text-sm font-medium rounded-md hover:bg-cream transition-colors flex items-center justify-center cursor-pointer">
                    Continuar Comprando
                  </span>
                </Link>
              </div>

              <p className="font-body text-xs text-brand-secondary text-center mt-4">
                Pagamento seguro via PIX, cartão ou boleto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}