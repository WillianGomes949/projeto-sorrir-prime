// src/pages/HomePage.tsx (VERSÃO LIMPA)
import { Hero } from '../components/layout/Hero';
import { ServicesGrid } from '../components/layout/ServicesGrid';
import { AboutClinic } from '../components/layout/AboutClinic';
import { ContactSection } from '../components/layout/ContactSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <AboutClinic />
      <ContactSection />
    </>
  );
}