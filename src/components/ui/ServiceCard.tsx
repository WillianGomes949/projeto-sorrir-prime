// src/components/ui/ServiceCard.tsx

import type { Service } from "../../types/Types";

// 1. Importamos o type que define a estrutura dos nossos dados


// 2. Definimos que as props do componente são um objeto chamado 'service'
interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  // 3. Desestruturamos os dados do serviço para facilitar o uso
  const { icon: Icon, title, description } = service;

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Ícone */}
      <div className="mb-4">
        <Icon className="text-blue-700" size={48} />
      </div>

      {/* Título */}
      <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>

      {/* Descrição */}
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}