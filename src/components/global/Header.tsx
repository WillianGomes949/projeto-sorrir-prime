// src/components/global/Header.tsx

import { useState, useEffect } from "react";
import { RiAdminFill, RiCalendarScheduleLine, RiCloseLine } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { Button } from "../ui/Button";
import { IoMenu } from "react-icons/io5";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { title: "Início", href: "/" },
    { title: "Serviços", href: "/#servicos" },
    { title: "Sobre Nós", href: "/#sobre" },
    { title: "Contato", href: "/#contato" },
  ];

  // Efeito de scroll para header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    // Para links âncora, rolar suavemente
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-lg' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={closeMobileMenu}
          >
            <div className="p-2 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <SiMarketo size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              SorrirPrime
            </span>
          </a>

          {/* Navegação (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-gray-700 hover:text-blue-700 transition-all duration-300 relative group font-medium"
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Botões (Desktop) */}
          <div className="gap-2 lg:gap-4 justify-center items-center hidden md:flex">
            <Button
              href="/admin"
              variant="ghost"
              size="sm"
              rounded="full"
              icon={<RiAdminFill size={18} />}
              className="text-gray-600 hover:text-blue-700 border-gray-300 hover:border-blue-300"
            >
              Admin
            </Button>

            <Button
              href="/servicos"
              variant="primary"
              size="sm"
              rounded="full"
              icon={<RiCalendarScheduleLine size={18} />}
              className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
            >
              Agendar
            </Button>
          </div>

          {/* Ícone de Menu (Mobile) */}
          <button
            className="md:hidden p-3 rounded-xl text-gray-600 hover:text-blue-700 hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <RiCloseLine size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Overlay do Menu Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Menu Mobile */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-full z-50 bg-white/95 backdrop-blur-xl border-l border-gray-200/80 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Cabeçalho do Menu Mobile */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl">
              <SiMarketo size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-linear-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              SorrirPrime
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Navegação Mobile */}
        <nav className="p-6">
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => handleNavLinkClick(link.href)}
                className="flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 group border border-transparent hover:border-blue-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="font-medium text-lg">{link.title}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </nav>

        {/* Botões Mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/80 bg-white/80 backdrop-blur-sm">
          <div className="space-y-4">
            <Button
              href="/admin"
              variant="ghost"
              size="lg"
              rounded="xl"
              icon={<RiAdminFill size={20} />}
              className="w-full justify-center text-gray-600 hover:text-blue-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
              onClick={closeMobileMenu}
            >
              Área Administrativa
            </Button>

            <Button
              href="/servicos"
              variant="primary"
              size="lg"
              rounded="xl"
              icon={<RiCalendarScheduleLine size={20} />}
              className="w-full justify-center bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
              onClick={closeMobileMenu}
            >
              Agendar Consulta
            </Button>
          </div>

          {/* Informações de Contato Rápidas */}
          <div className="mt-6 pt-6 border-t border-gray-200/60">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Precisa de ajuda?</p>
              <div className="space-y-1 text-sm">
                <a 
                  href="tel:+5511999999999" 
                  className="text-blue-600 hover:text-blue-700 font-medium block"
                  onClick={closeMobileMenu}
                >
                  (11) 99999-9999
                </a>
                <a 
                  href="mailto:contato@sorrirprime.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium block"
                  onClick={closeMobileMenu}
                >
                  contato@sorrirprime.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}