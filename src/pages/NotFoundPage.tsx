// src/pages/NotFoundPage.tsx

import { Link } from 'react-router-dom'; // Para criar um link de volta
import { FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    // 'pt-20' para compensar o Header fixo
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
      
      <FaExclamationTriangle className="text-yellow-500 mb-6" size={80} />

      <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-8">
        Página Não Encontrada
      </h2>
      
      <p className="text-lg text-gray-500 mb-10 max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>

      <Link to="/">
        <Button variant="primary">
          Voltar para a Página Inicial
        </Button>
      </Link>
      
    </div>
  );
}