// src/components/layout/ServicesGrid.tsx

// 1. Importando os componentes de UI
import { servicesData } from "../../lib/db";
import { SectionTitle } from "../ui/SectionTitle";
import { ServiceCard } from "../ui/ServiceCard";

// 2. Importando nossos dados do "banco de dados"

export function ServicesGrid() {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* 3. Renderizando o Título da Seção (Reutilizável) */}
        <SectionTitle
          subtitle="Nossos Tratamentos"
          title="Serviços que transformam sorrisos"
          className="mb-12" // Dando espaço entre o título e o grid
        />

        {/* 4. O Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 5. Fazendo o loop (map) nos dados importados.
               Para cada 'service' em 'servicesData', renderize
               um componente 'ServiceCard' e passe o 'service' como prop.
          */}
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.title} // Chave (key) é essencial para o React em listas
              service={service} 
            />
          ))}

        </div>
      </div>
    </section>
  );
}