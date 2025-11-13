// src/pages/NotFoundPage.tsx

import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-linear-to-br from-blue-50 to-cyan-50 relative overflow-hidden py-24">
      <div className="relative z-10 max-w-2xl">
        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto shadow-2xl border-8 border-yellow-200">
            <FaExclamationTriangle className="text-yellow-500" size={60} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-8xl md:text-9xl font-black text-gray-800 mb-4 bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Página Não Encontrada
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
            Parece que você se perdeu no caminho para o sorriso perfeito. 
            Vamos te ajudar a voltar aos trilhos!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button 
              variant="primary" 
              size="lg"
              icon={<FaHome />}
              className="group"
            >
              <span className="flex items-center gap-2">
                Página Inicial
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            className="group"
          >
            <span className="flex items-center gap-2">
              Voltar
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-2">Precisa de ajuda?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Entre em contato conosco se precisar de assistência.
          </p>
          <Link 
            to="/#contato" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Falar com atendimento</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-10 right-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-bounce animation-delay-500"></div>
    </section>
  );
}