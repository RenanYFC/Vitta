import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/mocks/products';
import CardPreview from '@/components/feature/CardPreview';

const steps = [
  { id: 1, label: 'Identificação' },
  { id: 2, label: 'Entrega' },
  { id: 3, label: 'Pagamento' },
];

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
];

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getCartTotal = useCartStore((s) => s.getCartTotal);

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1
  const [personalData, setPersonalData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    whatsappOffers: false,
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  // Step 2
  const [selectedShipping, setSelectedShipping] = useState('correios-pac');
  const shippingOptions = [
    { id: 'correios-pac', label: 'PAC Correios', time: '5 a 8 dias úteis', price: 1890, icon: 'ri-truck-line' },
    { id: 'correios-sedex', label: 'SEDEX', time: '1 a 2 dias úteis', price: 3490, icon: 'ri-flashlight-line' },
    { id: 'frete-gratis', label: 'Frete Grátis', time: '5 a 8 dias úteis', price: 0, icon: 'ri-gift-line', badge: 'GRÁTIS', showIf: () => subtotal >= 39900 },
    { id: 'retirar-loja', label: 'Retirar na Loja', time: 'Disponível amanhã', price: 0, icon: 'ri-store-line' },
  ];

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1',
  });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getCartTotal();
  const shippingPrice = shippingOptions.find((s) => s.id === selectedShipping)?.price || 0;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const pixDiscount = paymentMethod === 'pix' ? Math.round((subtotal + shippingPrice - discount) * 0.05) : 0;
  const total = subtotal + shippingPrice - discount - pixDiscount;

  // CEP lookup (ViaCEP)
  const lookupCep = useCallback(async (cep: string) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setPersonalData((prev) => ({
          ...prev,
          address: data.logradouro || prev.address,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      // Silently fail — user can fill manually
    }
  }, []);

  // Validation
  const canProceedStep1 = () => {
    const cleanCep = personalData.cep.replace(/\D/g, '');
    return (
      personalData.fullName.trim().length > 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email) &&
      cleanCep.length === 8 &&
      personalData.address.trim().length > 3 &&
      personalData.number.trim().length > 0 &&
      personalData.city.trim().length > 1 &&
      personalData.state.length === 2 &&
      personalData.cpf.replace(/\D/g, '').length === 11
    );
  };

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/pedido-confirmado');
    }, 2500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white pt-6 md:pt-10">
        <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 text-center">
          <h1 className="font-display text-2xl text-brand-text mb-2">Carrinho vazio</h1>
          <p className="font-body text-sm text-brand-secondary mb-6">Adicione produtos ao carrinho para continuar.</p>
          <Link to="/colecao">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white font-body text-base font-medium rounded-md hover:bg-teal-dark transition-colors cursor-pointer">
              Ver Coleção
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const visibleShippingOptions = shippingOptions.filter((opt) => {
    if (opt.showIf) return opt.showIf();
    return true;
  });

  return (
    <div className="min-h-screen bg-off-white pt-6 md:pt-10">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link to="/" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">Início</Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <Link to="/carrinho" className="font-body text-sm text-brand-secondary hover:text-teal transition-colors">Carrinho</Link>
          <i className="ri-arrow-right-s-line text-brand-muted text-sm" />
          <span className="font-body text-sm text-brand-text">Checkout</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left — Steps */}
          <div className="flex-1 lg:max-w-[60%]">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-colors ${
                    currentStep > step.id ? 'bg-teal text-white' : currentStep === step.id ? 'bg-teal text-white' : 'bg-cream text-brand-secondary'
                  }`}>
                    {currentStep > step.id ? <i className="ri-check-line" /> : step.id}
                  </div>
                  <span className={`ml-2 font-body text-xs hidden sm:inline ${currentStep >= step.id ? 'text-teal font-medium' : 'text-brand-secondary'}`}>
                    {step.label}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${currentStep > step.id ? 'bg-teal' : 'bg-brand-border'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1 — Identificação */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg p-5 md:p-6 border border-brand-border">
                <h2 className="font-body text-base font-semibold text-brand-text mb-5">Dados Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Nome completo *</label>
                    <input type="text" value={personalData.fullName} onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="Maria Silva" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">CPF *</label>
                    <input type="text" value={personalData.cpf} onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 3) v = v.slice(0,3)+'.'+v.slice(3); if (v.length > 7) v = v.slice(0,7)+'.'+v.slice(7); if (v.length > 11) v = v.slice(0,11)+'-'+v.slice(11,13); setPersonalData({ ...personalData, cpf: v }); }} maxLength={14} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">E-mail *</label>
                    <input type="email" value={personalData.email} onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="maria@email.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Celular / WhatsApp *</label>
                    <input type="text" value={personalData.phone} onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 2) v = '('+v.slice(0,2)+') '+v.slice(2); if (v.length > 13) v = v.slice(0,13)+'-'+v.slice(13,17); setPersonalData({ ...personalData, phone: v }); }} maxLength={15} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input id="wpp-offers" type="checkbox" checked={personalData.whatsappOffers} onChange={(e) => setPersonalData({ ...personalData, whatsappOffers: e.target.checked })} className="w-4 h-4 accent-teal cursor-pointer" />
                    <label htmlFor="wpp-offers" className="font-body text-xs text-brand-secondary cursor-pointer">Quero receber ofertas exclusivas por WhatsApp</label>
                  </div>
                </div>

                <h2 className="font-body text-base font-semibold text-brand-text mt-8 mb-5">Endereço de Entrega</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">CEP *</label>
                      <input type="text" value={personalData.cep} onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 5) v = v.slice(0,5)+'-'+v.slice(5,8); setPersonalData({ ...personalData, cep: v }); }} maxLength={9} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="00000-000" />
                    </div>
                    <button onClick={() => lookupCep(personalData.cep)} className="self-end px-4 py-2.5 bg-cream text-teal font-body text-sm font-medium rounded-md hover:bg-cream-dark transition-colors cursor-pointer whitespace-nowrap">
                      Buscar
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Rua / Avenida *</label>
                    <input type="text" value={personalData.address} onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="Rua Oscar Freire" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Número *</label>
                    <input type="text" value={personalData.number} onChange={(e) => setPersonalData({ ...personalData, number: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="1234" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Complemento</label>
                    <input type="text" value={personalData.complement} onChange={(e) => setPersonalData({ ...personalData, complement: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="Apto 42" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-brand-text mb-1 block">Bairro</label>
                    <input type="text" value={personalData.neighborhood} onChange={(e) => setPersonalData({ ...personalData, neighborhood: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="Jardins" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">Cidade *</label>
                      <input type="text" value={personalData.city} onChange={(e) => setPersonalData({ ...personalData, city: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="São Paulo" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">Estado *</label>
                      <select value={personalData.state} onChange={(e) => setPersonalData({ ...personalData, state: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border bg-white font-body text-sm text-brand-text outline-none focus:border-teal cursor-pointer">
                        <option value="">UF</option>
                        {states.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="flex items-center gap-2 mt-5 font-body text-xs text-brand-secondary">
                  <i className="ri-lock-line text-teal" />
                  Seus dados estão protegidos com criptografia SSL
                </p>

                <button onClick={() => canProceedStep1() && setCurrentStep(2)} disabled={!canProceedStep1()} className="w-full mt-6 py-4 bg-teal text-white font-body text-base font-semibold rounded-md hover:bg-teal-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  Continuar para Entrega →
                </button>
              </div>
            )}

            {/* Step 2 — Entrega */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg p-5 md:p-6 border border-brand-border">
                <h2 className="font-body text-base font-semibold text-brand-text mb-5">Escolha o Frete</h2>
                <div className="space-y-3">
                  {visibleShippingOptions.map((opt) => (
                    <button key={opt.id} onClick={() => setSelectedShipping(opt.id)} className={`w-full flex items-center gap-4 p-4 rounded-md border transition-all cursor-pointer text-left ${
                      selectedShipping === opt.id ? 'border-l-4 border-l-teal border-t-brand-border border-r-brand-border border-b-brand-border bg-teal/5' : 'border-brand-border hover:bg-cream'
                    }`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedShipping === opt.id ? 'border-teal' : 'border-brand-border'}`}>
                        {selectedShipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-teal" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm font-medium text-brand-text">{opt.label}</span>
                          {opt.badge && <span className="px-2 py-0.5 bg-teal text-white rounded font-body text-[10px] font-semibold">{opt.badge}</span>}
                        </div>
                        <span className="font-body text-xs text-brand-secondary">{opt.time}</span>
                      </div>
                      <span className={`font-body text-sm font-semibold ${opt.price === 0 ? 'text-teal' : 'text-teal'}`}>{opt.price === 0 ? 'Grátis' : formatPrice(opt.price)}</span>
                    </button>
                  ))}
                </div>
                {selectedShipping === 'retirar-loja' && (
                  <div className="mt-4 p-4 bg-cream rounded-md space-y-2">
                    <p className="font-body text-xs font-semibold text-brand-text">Lojas disponíveis para retirada:</p>
                    <p className="font-body text-xs text-brand-secondary">📍 Av. Paulista, 1000 — Bela Vista, SP</p>
                    <p className="font-body text-xs text-brand-secondary">📍 Rua Oscar Freire, 450 — Jardins, SP</p>
                  </div>
                )}

                <button onClick={() => setCurrentStep(3)} className="w-full mt-6 py-4 bg-teal text-white font-body text-base font-semibold rounded-md hover:bg-teal-dark transition-colors cursor-pointer">
                  Continuar para Pagamento →
                </button>
                <button onClick={() => setCurrentStep(1)} className="w-full mt-3 py-3 text-brand-text font-body text-sm hover:text-teal transition-colors cursor-pointer">
                  ← Voltar para Identificação
                </button>
              </div>
            )}

            {/* Step 3 — Pagamento */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg p-5 md:p-6 border border-brand-border">
                <h2 className="font-body text-base font-semibold text-brand-text mb-5">Pagamento</h2>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6">
                  {[
                    { id: 'cartao', label: 'Cartão', icon: 'ri-bank-card-line' },
                    { id: 'pix', label: 'PIX', icon: 'ri-qr-code-line' },
                    { id: 'boleto', label: 'Boleto', icon: 'ri-barcode-line' },
                  ].map((m) => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-md border font-body text-sm transition-all cursor-pointer ${
                      paymentMethod === m.id ? 'border-teal bg-teal text-white' : 'border-brand-border text-brand-text hover:bg-cream'
                    }`}>
                      <i className={m.icon} /> {m.label}
                    </button>
                  ))}
                </div>

                {/* Cartão */}
                {paymentMethod === 'cartao' && (
                  <div className="space-y-4">
                    <CardPreview {...cardData} flipped={cardFlipped} />
                    <div>
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">Número do cartão *</label>
                      <div className="relative">
                        <input type="text" value={cardData.number} onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); v = v.match(/.{1,4}/g)?.join(' ') || v; setCardData({ ...cardData, number: v.slice(0, 19) }); }} onFocus={() => setCardFlipped(false)} className="w-full px-3 py-2.5 pr-10 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="0000 0000 0000 0000" />
                        <i className="ri-bank-card-line absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">Nome no cartão *</label>
                      <input type="text" value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })} onFocus={() => setCardFlipped(false)} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="MARIA SILVA" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-brand-text mb-1 block">Validade *</label>
                        <input type="text" value={cardData.expiry} onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 2) v = v.slice(0,2)+'/'+v.slice(2,4); setCardData({ ...cardData, expiry: v }); }} onFocus={() => setCardFlipped(false)} maxLength={5} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="MM/AA" />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-brand-text mb-1 block">CVV *</label>
                        <input type="text" value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} onFocus={() => setCardFlipped(true)} onBlur={() => setCardFlipped(false)} maxLength={3} className="w-full px-3 py-2.5 rounded-md border border-brand-border font-body text-sm outline-none focus:border-teal" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs font-medium text-brand-text mb-1 block">Parcelas</label>
                      <select value={cardData.installments} onChange={(e) => setCardData({ ...cardData, installments: e.target.value })} className="w-full px-3 py-2.5 rounded-md border border-brand-border bg-white font-body text-sm text-brand-text outline-none focus:border-teal cursor-pointer">
                        {[1, 2, 3, 4, 5, 6, 10].map((n) => (
                          <option key={n} value={n}>{n}x de {formatPrice(Math.ceil(total / n))}{n === 1 ? ' à vista' : ' sem juros'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* PIX */}
                {paymentMethod === 'pix' && (
                  <div className="text-center py-4">
                    <div className="w-52 h-52 mx-auto border-2 border-dashed border-teal rounded-lg flex items-center justify-center mb-4 bg-cream">
                      <i className="ri-qr-code-line text-6xl text-teal/50" />
                    </div>
                    <p className="font-body text-sm text-brand-text mb-1">QR Code para pagamento PIX</p>
                    <p className="font-body text-xs text-brand-secondary mb-4">Escaneie o QR Code ou copie o código</p>
                    <div className="flex items-center gap-2 max-w-sm mx-auto mb-4">
                      <div className="flex-1 px-3 py-2 bg-cream rounded-md font-body text-xs text-brand-secondary truncate">00020126580014BR.GOV.BCB.PIX0136vitta@pix.com.br</div>
                      <button className="px-4 py-2 bg-teal text-white font-body text-xs rounded-md hover:bg-teal-dark transition-colors cursor-pointer">Copiar</button>
                    </div>
                    {/* Countdown timer placeholder */}
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      <i className="ri-time-line text-brand-muted text-xs" />
                      <span className="font-body text-xs text-brand-secondary">Código válido por 30:00 minutos</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-1 font-body text-xs text-teal font-semibold">1</div>
                        <span className="font-body text-[10px] text-brand-secondary">Abra seu banco</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-1 font-body text-xs text-teal font-semibold">2</div>
                        <span className="font-body text-[10px] text-brand-secondary">Escaneie</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-teal/10 mb-1 font-body text-xs text-teal font-semibold">3</div>
                        <span className="font-body text-[10px] text-brand-secondary">Confirme</span>
                      </div>
                    </div>
                    <p className="font-body text-xs text-teal mt-4">5% de desconto ao pagar com PIX</p>
                  </div>
                )}

                {/* Boleto */}
                {paymentMethod === 'boleto' && (
                  <div className="text-center py-6">
                    <div className="w-52 h-52 mx-auto bg-cream rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-barcode-line text-6xl text-brand-muted" />
                    </div>
                    <p className="font-body text-sm text-brand-text mb-1">Boleto Bancário</p>
                    <p className="font-body text-xs text-brand-secondary mb-4">O boleto será gerado após a confirmação do pedido e vence em 3 dias úteis</p>
                    <button className="px-6 py-2.5 bg-teal text-white font-body text-sm rounded-md hover:bg-teal-dark transition-colors cursor-pointer mb-3">Gerar Boleto</button>
                    <p className="font-body text-xs text-[#C8553D]">Pagamento confirmado em até 2 dias úteis</p>
                  </div>
                )}

                {/* CTA */}
                <button onClick={handleFinish} disabled={isProcessing} className="w-full mt-6 py-4 bg-teal text-white font-body text-base font-semibold rounded-md hover:bg-teal-dark transition-colors cursor-pointer disabled:opacity-50">
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin" /> Processando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Finalizar Pedido <i className="ri-check-line" />
                    </span>
                  )}
                </button>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-lock-line text-teal" /> SSL</span>
                  <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-shield-check-line text-teal" /> Compra Segura</span>
                  <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-refresh-line text-teal" /> Troca 30 dias</span>
                </div>

                <button onClick={() => setCurrentStep(2)} className="w-full mt-3 py-3 text-brand-text font-body text-sm hover:text-teal transition-colors cursor-pointer">
                  ← Voltar para Entrega
                </button>
              </div>
            )}
          </div>

          {/* Right — Sticky Order Summary */}
          <div className="w-full lg:w-[35%] flex-shrink-0">
            <div className="lg:sticky lg:top-[120px] bg-white rounded-lg p-5 md:p-6 border border-brand-border">
              <h3 className="font-body text-base font-semibold text-brand-text mb-4">Resumo do Pedido</h3>

              {/* Products */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-md overflow-hidden bg-cream flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain p-1" style={{ mixBlendMode: 'multiply' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium text-brand-text truncate">{item.product.name}</p>
                      <p className="font-body text-[10px] text-brand-secondary">Tam {item.size} · Qtd {item.quantity}</p>
                    </div>
                    <span className="font-body text-xs text-brand-text font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-border pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-brand-secondary">Subtotal</span>
                  <span className="font-body text-sm text-brand-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-brand-secondary">Frete</span>
                  <span className="font-body text-sm text-brand-text">{shippingPrice === 0 ? <span className="text-teal">Grátis</span> : formatPrice(shippingPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-teal">Desconto</span>
                    <span className="font-body text-sm text-teal">-{formatPrice(discount)}</span>
                  </div>
                )}
                {pixDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-teal">Desconto PIX (5%)</span>
                    <span className="font-body text-sm text-teal">-{formatPrice(pixDiscount)}</span>
                  </div>
                )}
              </div>

              {/* Coupon */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-border">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Tem um cupom?" className="flex-1 px-3 py-2 rounded-md border border-brand-border font-body text-xs outline-none focus:border-teal" />
                <button onClick={() => setCouponApplied(couponCode.toLowerCase() === 'vitta10')} className="px-3 py-2 bg-cream text-teal font-body text-xs font-medium rounded-md hover:bg-cream-dark transition-colors cursor-pointer">Aplicar</button>
              </div>
              {couponApplied && <p className="font-body text-[10px] text-teal mt-1">Cupom VITTA10 aplicado! 10% OFF</p>}
              {couponCode && !couponApplied && couponCode.toLowerCase() !== 'vitta10' && <p className="font-body text-[10px] text-[#C8553D] mt-1">Cupom inválido</p>}

              {/* Total */}
              <div className="mt-4 pt-3 border-t-2 border-brand-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-sm font-semibold text-brand-text">Total</span>
                  <span className="font-display text-xl text-teal font-semibold">{formatPrice(total)}</span>
                </div>
                <p className="font-body text-xs text-brand-secondary">ou 10x de {formatPrice(Math.ceil(total / 10))} sem juros</p>
              </div>

              {/* Trust */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-brand-border">
                <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-lock-line text-teal" /> SSL</span>
                <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-shield-check-line text-teal" /> Compra Segura</span>
                <span className="flex items-center gap-1 font-body text-[10px] text-brand-secondary"><i className="ri-refresh-line text-teal" /> Troca 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
