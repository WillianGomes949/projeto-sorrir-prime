// src/components/global/Header.tsx

import { SiMarketo } from "react-icons/si"; // Ícone de exemplo

export function Header() {
  const navLinks = [
    { title: "Início", href: "/" },
    { title: "Serviços", href: "/#servicos" },
    { title: "Sobre Nós", href: "/#sobre" },
    { title: "Contato", href: "/#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-blue-800">
          <SiMarketo size={24} /> {/* Substitua pelo seu ícone/logo real */}
          <span>SorrirPrime</span>
        </a>

        {/* Navegação (Desktop) */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-gray-600 hover:text-blue-800 transition-colors"
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Botão CTA (Call to Action) */}
        <a
          href="/servicos"
          className="hidden md:inline-block bg-blue-700 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors"
        >
          Agendar Consulta
        </a>

        {/* Ícone de Menu (Mobile) - (Adicionaremos a lógica depois) */}
        <div className="md:hidden text-gray-700">
          {/* Aqui usaremos um ícone de menu (ex: HiMenu) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

      </div>
    </header>
  );
}