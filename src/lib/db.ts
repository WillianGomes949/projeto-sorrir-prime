// src/data/db.ts

import {
  FaTooth,
  FaSyringe,
  FaStethoscope,
  FaXRay,
  FaSmile,
  FaUserMd,
} from "react-icons/fa"; // Ícones de exemplo - Dentista
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // Ícones sociais
import type { ContactInfo, NavLink, Service, SocialLink } from "../types/Types";

// --- Links de Navegação (Header) ---
export const navLinks: NavLink[] = [
  { title: "Início", href: "#inicio" },
  { title: "Serviços", href: "#servicos" },
  { title: "Sobre Nós", href: "#sobre" },
  { title: "Contato", href: "#contato" },
];

// --- Dados da Seção Hero ---
export const heroData = {
  subtitle: "Clínica SorrirPrime",
  title: "Cuidando do seu sorriso em Fortaleza com tecnologia e carinho.",
  description:
    "Agende uma consulta e descubra como nossa equipe especializada pode transformar seu sorriso com os tratamentos mais modernos.",
  ctaPrimary: "Agendar Consulta",
  ctaSecondary: "Ver Serviços",
};

// --- Dados da Seção de Serviços ---
export const servicesData: Service[] = [
  {
    id: 1,
    icon: FaTooth,
    title: "Clareamento Dental",
    description:
      "Tratamento moderno para dentes mais brancos e um sorriso mais brilhante.",
  },
  {
    id: 2,
    icon: FaSyringe,
    title: "Implantes Dentários",
    description:
      "Recupere a função e a estética com implantes de titânio de alta qualidade.",
  },
  {
    id: 3,
    icon: FaStethoscope,
    title: "Aparelhos Ortodônticos",
    description:
      "Alinhamos seu sorriso com aparelhos tradicionais ou alinhadores invisíveis.",
  },
  {
    id: 4,
    icon: FaXRay,
    title: "Endodontia (Canal)",
    description:
      "Tratamento de canal sem dor, utilizando tecnologia de ponta para salvar seu dente.",
  },
  {
    id: 5,
    icon: FaSmile,
    title: "Lentes de Contato Dental",
    description:
      "Facetas de porcelana ultrafinas para um sorriso perfeito e harmonioso.",
  },
  {
    id: 6,
    icon: FaUserMd,
    title: "Limpeza e Profilaxia",
    description:
      "Prevenção é o melhor remédio. Mantenha sua saúde bucal em dia conosco.",
  },
];

// --- Dados da Seção Sobre Nós ---
export const aboutData = {
  subtitle: "Conheça a SorrirPrime",
  title: "Mais que uma clínica, um lugar para renovar sua autoestima.",
  description:
    "Fundada em Fortaleza, a SorrirPrime nasceu com o objetivo de unir tecnologia de ponta e um atendimento humano e acolhedor. Nossa equipe, liderada pela Dra. Ana, é apaixonada por transformar sorrisos e vidas.",
  feature1: "Equipamentos de última geração.",
  feature2: "Equipe especializada e em constante atualização.",
  feature3: "Atendimento humanizado e focado no seu conforto.",
};

// --- Dados de Contato e Rodapé ---
export const contactData: ContactInfo = {
  phone: "(85) 9 9988-7766",
  email: "contato@sorrirprime.com.br",
  address: "Av. Beira Mar, 1234 - Meireles, Fortaleza - CE",
  whatsappApi: "https://api.whatsapp.com/send?phone=5585999887766", // Link da API
};

// --- Links de Redes Sociais ---
export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
];
