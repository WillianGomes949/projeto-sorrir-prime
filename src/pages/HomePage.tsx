// src/pages/HomePage.tsx (VERSÃO LIMPA)
import { Hero } from '../components/layout/Hero';
import { ServicesGrid } from '../components/layout/ServicesGrid';
import { AboutClinic } from '../components/layout/AboutClinic';
import { ContactSection } from '../components/layout/ContactSection';
import TopButton from '../components/ui/TopButton';
import DentalClinicGrid from '../components/ui/DentalClinicGrid';


export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <DentalClinicGrid/>
      <AboutClinic />
      <ContactSection />
      <TopButton/>
    </>
  );
}