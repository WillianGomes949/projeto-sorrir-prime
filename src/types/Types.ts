// src/types/Types.ts
import type { ElementType } from "react";


export interface NavLink {
  title: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: ElementType; // Permite passar o componente do react-icons (ex: FaTooth)
}

export interface SocialLink {
  name: string;
  href: string;
  icon: ElementType;
}

// Interface para os dados de contato
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsappApi: string; // Link direto para a API do WhatsApp
}
// Payload do formulário de contato
export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message?: string;
}
export interface AppointmentPayload {
  name: string;
  email: string;
  phone: string;
  serviceId: string; // <-- NOVO: O serviço que o cliente quer
  date: string;      // <-- NOVO: A data que ele escolheu
  time: string;      // <-- NOVO: O horário que ele escolheu
  message?: string;
}