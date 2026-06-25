export default function WhatsAppBar() {
  return (
    <>
      {/* Desktop bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-teal">
        <div className="w-full px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <p className="font-body text-sm text-white/90">
            Dúvidas sobre numeração? Fale via WhatsApp
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-whatsapp text-white font-body text-sm font-medium rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <i className="ri-whatsapp-line" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile floating button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-4 z-50 w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Chamar no WhatsApp"
      >
        <i className="ri-whatsapp-line text-2xl" />
      </a>
    </>
  );
}