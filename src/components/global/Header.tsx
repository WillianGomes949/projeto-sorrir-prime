// src/components/global/Header.tsx

import { RiAdminFill, RiCalendarScheduleLine } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { Button } from "../ui/Button";
import { IoMenu } from "react-icons/io5";

export function Header() {
  const navLinks = [
    { title: "Início", href: "/" },
    { title: "Serviços", href: "/#servicos" },
    { title: "Sobre Nós", href: "/#sobre" },
    { title: "Contato", href: "/#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
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
              className="text-gray-700 hover:text-blue-700 transition-all duration-300 relative group"
            >
              {link.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        <div className="gap-1 md:gap-8 justify-center items-center hidden md:flex">
          {/* Botão CTA (Call to Action) */}
          <Button
            href="/servicos"
            variant="primary"
            size="sm"
            rounded="full"
            icon={<RiCalendarScheduleLine size={20} />}
          >
            Agendar Consulta
          </Button>

          {/* Icone admin */}
          <Button
            href="/admin"
            variant="primary"
            size="sm"
            rounded="full"
            icon={<RiAdminFill size={20} />}
          >
            Administrador
          </Button>
        </div>

        {/* Ícone de Menu (Mobile) */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Abrir menu"
        >
          <IoMenu size={20} />
        </button>
      </div>
    </header>
  );
}
