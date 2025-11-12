// src/pages/ServicesPage.tsx

import { SchedulingSection } from "../components/layout/SchedulingSection";
import { ServicesGrid } from "../components/layout/ServicesGrid";
import { SectionTitle } from "../components/ui/SectionTitle";

export function ServicesPage() {
  return (
    <div className="pt-20">
      <SectionTitle
        subtitle="Conheça"
        title="Nossos Tratamentos"
        className="pt-16"
      />
      <SchedulingSection />
      <ServicesGrid />
    </div>
  );
}
