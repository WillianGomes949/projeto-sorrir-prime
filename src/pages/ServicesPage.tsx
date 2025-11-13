// src/pages/ServicesPage.tsx

import { SchedulingSection } from "../components/layout/SchedulingSection";
import { ServicesGrid } from "../components/layout/ServicesGrid";

export function ServicesPage() {
  return (
    <div className="pt-20">
      <SchedulingSection />
      <ServicesGrid />
    </div>
  );
}
