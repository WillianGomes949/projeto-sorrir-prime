// src/components/layout/Hero.tsx

import { CgCheck } from "react-icons/cg";
import { Button } from "../ui/Button";
import { BiShield, BiSmile } from "react-icons/bi";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center min-h-screen bg-linear-to-br from-blue-50 to-cyan-100 overflow-hidden py-24"
    >
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Clínica Odontológica de Excelência
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Seu sorriso perfeito
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                começa aqui
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tecnologia de ponta, atendimento humanizado e resultados que
              transformam vidas. Sua jornada para um sorriso saudável e
              confiante começa agora.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" href="/servicos" className="group">
                Agendar Consulta
              </Button>
              <Button variant="secondary" href="#servicos">
                Conhecer Tratamentos
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                  <CgCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">
                  Atendimento Personalizado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BiShield className="w-4 h-4 text-blue-600"/>
                </div>
                <span className="text-sm text-gray-600">
                  Certificação de Qualidade
                </span>
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BiSmile size={80} className="text-white/50"/>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      
    </section>
  );
}
