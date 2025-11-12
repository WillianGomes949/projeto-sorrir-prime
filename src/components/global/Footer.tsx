// src/components/global/Footer.tsx

import { SiMarketo } from 'react-icons/si'; // Mesmo ícone do Header
import { contactData, navLinks, socialLinks } from '../../lib/db';

// Importando todos os dados necessários do DB


export function Footer() {
  const { address, email, phone } = contactData;

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        
        {/* Grid principal do Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Logo e Sobre */}
          <div className="md:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <SiMarketo size={24} />
              <span>SorrirPrime</span>
            </a>
            <p className="text-sm text-gray-400">
              Transformando sorrisos com tecnologia e atendimento humanizado em Fortaleza.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4">Entre em Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">{address}</li>
              <li className="flex items-start gap-2">{phone}</li>
              <li className="flex items-start gap-2">{email}</li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h4 className="font-semibold text-white mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Copyright */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SorrirPrime. Todos os direitos reservados.</p>
          <p>Feito por Willian Gomes.</p> {/* Ótimo lugar para seu portfólio */}
        </div>
      </div>
    </footer>
  );
}