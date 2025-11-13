// src/components/global/Footer.tsx

import { SiMarketo } from "react-icons/si";
import { contactData, navLinks, socialLinks } from "../../lib/db";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { IoMail, IoPhonePortrait } from "react-icons/io5";

export function Footer() {
  const { address, email, phone } = contactData;

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        {/* Grid principal do Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna 1: Logo e Sobre */}
          <div className="space-y-6">
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <SiMarketo size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent">
                SorrirPrime
              </span>
            </a>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              Transformando sorrisos com tecnologia de ponta e atendimento
              humanizado em Fortaleza.
            </p>

            {/* Redes Sociais */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Links e Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Links Rápidos */}
            <div>
              <h4 className="font-bold text-white text-lg mb-6 relative inline-block">
                Links Rápidos
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-bold text-white text-lg mb-6 relative inline-block">
                Contato
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3 group hover:text-white transition-colors">
                  <IoMdPin
                    className="w-5 h-5 text-blue-400 shrink-0"
                    size={20}
                  />

                  <span className="leading-relaxed">{address}</span>
                </li>
                <li className="flex items-center gap-3 group hover:text-white transition-colors">
                  <IoPhonePortrait
                    className="w-5 h-5 text-blue-400 shrink-0"
                    size={20}
                  />

                  <span>{phone}</span>
                </li>
                <li className="flex items-center gap-3 group hover:text-white transition-colors">
                  <IoMail
                    className="w-5 h-5 text-blue-400 shrink-0"
                    size={20}
                  />
                  <span>{email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-500 text-sm flex gap-4 justify-center items-center">
              <FaRegCopyright />
              <span>
                {new Date().getFullYear()} SorrirPrime. Todos os direitos
                reservados.
              </span>
            </p>
            <p className="text-gray-500 text-sm flex gap-2 justify-center items-center">
              <span>Desenvolvido por</span>
              <a
                href="https://williangomes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Willian Gomes
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
