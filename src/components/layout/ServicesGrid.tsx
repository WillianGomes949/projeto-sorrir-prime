// src/components/layout/ServicesGrid.tsx

import { servicesData } from "../../lib/db";
import { Button } from "../ui/Button";
import { SectionTitle } from "../ui/SectionTitle";
import { ServiceCard } from "../ui/ServiceCard";

export function ServicesGrid() {
  return (
    <section
      id="servicos"
      className="py-20 md:py-28 bg-linear-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionTitle
          subtitle="Nossos Tratamentos"
          title="Serviços que transformam sorrisos"
          className="mb-16 text-center"
        />

        {/* Introductory Text */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-gray-600 leading-relaxed">
            Oferecemos tratamentos odontológicos completos com tecnologia de
            ponta e equipe especializada para cuidar do seu sorriso em todas as
            fases da vida.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para uma avaliação personalizada. Nossa
              equipe está pronta para entender suas necessidades e oferecer a
              melhor solução para o seu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" rounded="full">
                <a href="#agendamento">Agendar Avaliação</a>
              </Button>
              <Button variant="secondary" rounded="full">
                <a href="#contato">Falar com Especialista</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
