import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import WhatsAppBar from "./WhatsAppBar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Top Progress Loading Bar */}
      <div 
        className={`fixed top-0 left-0 h-[3px] bg-teal z-[200] transition-all duration-300 ease-out pointer-events-none ${
          loading ? "w-[60%] opacity-100" : "w-full opacity-0 duration-300"
        }`}
        style={{
          boxShadow: "0 0 8px rgba(27, 94, 90, 0.4)",
        }}
      />
      <ScrollToTop />
      <Navbar />
      <main key={pathname} className="flex-1 opacity-0 animate-premium-page">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppBar />
    </div>
  );
}