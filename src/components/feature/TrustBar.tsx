import { useState, useEffect } from 'react';

const messages = [
  { icon: 'ri-truck-line', text: 'Frete grátis acima de R$ 399' },
  { icon: 'ri-refresh-line', text: 'Troca grátis em 30 dias' },
  { icon: 'ri-shield-check-line', text: 'Pagamento 100% seguro' },
  { icon: 'ri-whatsapp-line', text: 'Atendimento pelo WhatsApp' },
];

export default function TrustBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-teal h-9 flex items-center justify-center overflow-hidden">
      {/* Desktop: show current message with rotation */}
      <div className="hidden md:flex items-center justify-center gap-6 w-full px-4">
        {messages.map((item, i) => (
          <div
            key={item.text}
            className={`flex items-center gap-1.5 transition-opacity duration-500 ${
              i === index ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <i className={`${item.icon} text-white text-xs`} />
            <span className="font-body text-xs text-white whitespace-nowrap">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: single item, rotating text */}
      <div className="md:hidden flex items-center justify-center gap-2 px-4">
        <i className={`${messages[index].icon} text-white text-xs flex-shrink-0`} />
        <span className="font-body text-xs text-white whitespace-nowrap">
          {messages[index].text}
        </span>
      </div>
    </div>
  );
}