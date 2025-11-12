// src/components/layout/AboutClinic.tsx
// (Ou src/components/sections/AboutClinic.tsx)

import { FaCheckCircle } from 'react-icons/fa'; // Ícone para a lista de features
import { SectionTitle } from '../ui/SectionTitle';
import { aboutData } from '../../lib/db';

// 1. Importando os dados da seção "Sobre" do nosso db


// 2. Importando uma imagem (Você deve adicionar uma imagem em /src/assets/images/)
// Exemplo: import ClinicImage from '../../assets/images/clinic-interior.jpg';

export function AboutClinic() {
  const { subtitle, title, description, feature1, feature2, feature3 } = aboutData;

  return (
    <section id="sobre" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título da Seção */}
        <SectionTitle
          subtitle={subtitle}
          title={title}
          className="mb-12"
        />

        {/* Layout de Duas Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Coluna da Imagem */}
          <div className="w-full h-80 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            {/* Use uma imagem real da sua pasta de assets aqui.
              O ideal é uma foto do consultório ou da equipe.
            */}
            <img
              // src={ClinicImage} // <-- Use a imagem importada
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470" // Imagem placeholder
              alt="Interior da Clínica SorrirPrime"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Coluna de Texto */}
          <div className="flex flex-col justify-center">
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Lista de Features (Diferenciais) */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-700 size-5" />
                <span className="text-gray-700">{feature1}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-700 size-5" />
                <span className="text-gray-700">{feature2}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-700 size-5" />
                <span className="text-gray-700">{feature3}</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}