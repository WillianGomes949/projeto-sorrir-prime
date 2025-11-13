// src/types/Types.ts
import type { ElementType } from "react";


export interface NavLink {
  title: string;
  href: string;
}

export interface Service {
  id: string;
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
export interface ContactFormPayload extends BasePayload {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface BasePayload {
  id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  submittedAt?: string;
}
export interface AppointmentPayload extends BasePayload {
  serviceId: string;
  date: string;
  time: string;
}