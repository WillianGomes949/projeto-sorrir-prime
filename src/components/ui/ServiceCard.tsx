// src/components/ui/ServiceCard.tsx

import type { Service } from "../../types/Types";
import { useState } from "react";

interface ServiceCardProps {
  service: Service;
  delay?: number;
  variant?: "default" | "featured";
}

export function ServiceCard({
  service,
  delay = 0,
  variant = "default",
}: ServiceCardProps) {
  const { icon: Icon, title, description, imgUrl } = service;
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    default: "bg-white border border-gray-100",
    featured:
      "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 relative overflow-hidden",
  };

  const iconVariants = {
    default: "bg-gradient-to-br from-blue-500 to-blue-600",
    featured: "bg-gradient-to-br from-blue-600 to-cyan-600",
  };

  return (
    <div
      className={`
        relative p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl group
        ${cardVariants[variant]}
        ${isHovered ? "scale-105" : "scale-100"}
      `}
      style={{
        animationDelay: `${delay}ms`,
        animation: "fadeInUp 0.6s ease-out both",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {variant === "featured" && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
            Popular
          </span>
        </div>
      )}

      {/* Background Effect */}
      <div className="absolute inset-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
        <div
          className="
          w-35 h-25 rounded-2xl flex items-center justify-center text-white shadow-lg
          transition-all duration-500 md:group-hover:scale-110 md:group-hover:-rotate-3 -rotate-3 md:group-hover:translate-x-25 translate-x-15 -translate-y-2 border-8 border-amber-50"
        >
          <img
            src={imgUrl}
            alt="Pattern"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
          />
        </div>
      </div>

      {/* Ícone com efeito flutuante */}
      <div className="relative z-10 mb-6">
        <div
          className={`
          w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg
          ${iconVariants[variant]}
          transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
        `}
        >
          <Icon
            size={28}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute -inset-2 bg-blue-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>

      {/* Título */}
      <h3
        className={`
        relative z-10 mb-4 text-xl font-bold leading-tight transition-colors duration-300
        ${variant === "featured" ? "text-gray-600" : "text-blue-900"}
        group-hover:text-gray-900
      `}
      >
        {title}

        {/* Linha decorativa sob o título */}
        <div className="w-12 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 mt-3 rounded-full opacity-60 group-hover:w-16 transition-all duration-500"></div>
      </h3>

      {/* Descrição */}
      <p className="relative z-10 text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
        {description}
      </p>
    </div>
  );
}
