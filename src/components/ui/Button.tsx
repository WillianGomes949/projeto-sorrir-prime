// src/components/ui/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";


// 1. Definimos os tipos de props que o botão aceita
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary"; // Nossas variantes de estilo
}

export function Button({
  children,
  variant = "primary", // 'primary' será o padrão
  className = "", // Permite adicionar classes extras de fora
  ...rest // Pega todas as outras props (onClick, type, etc.)
}: ButtonProps) {
  
  // 2. Estilos base do Tailwind (comuns a todas as variantes)
  const baseStyle =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // 3. Estilos específicos das variantes
  const variantStyles = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500",
    secondary:
      "bg-transparent text-blue-700 border border-blue-700 hover:bg-blue-100 focus:ring-blue-500",
  };

  // 4. Combina os estilos
  const combinedClassName = `
    ${baseStyle}
    ${variantStyles[variant]}
    ${className}
  `;

  return (
    // 5. Renderiza o botão passando as props e estilos
    <button className={combinedClassName.trim()} {...rest}>
      {children}
    </button>
  );
}