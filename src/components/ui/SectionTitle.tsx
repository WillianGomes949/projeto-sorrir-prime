// src/components/ui/SectionTitle.tsx

interface SectionTitleProps {
  subtitle?: string; // Um subtítulo opcional, menor
  title: string;    // O título principal da seção
  className?: string; // Para permitir espaçamentos extras (ex: 'mb-8')
}

export function SectionTitle({ subtitle, title, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      {/* Subtítulo (opcional) */}
      {subtitle && (
        <span className="text-blue-700 font-semibold text-sm tracking-wider uppercase">
          {subtitle}
        </span>
      )}

      {/* Título Principal */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
        {title}
      </h2>
      
      {/* Divisor Estilizado (Opcional, mas dá um toque premium) */}
      <div className="flex justify-center mt-4">
        <div className="w-16 h-1 bg-blue-700 rounded-full" />
      </div>
    </div>
  );
}