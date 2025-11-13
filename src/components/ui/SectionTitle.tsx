// src/components/ui/SectionTitle.tsx

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'default' | 'gradient';
}

export function SectionTitle({ 
  subtitle, 
  title, 
  className = "", 
  alignment = "center",
  variant = "default"
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  const titleColors = {
    default: "text-gray-900",
    gradient: "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className} group`}>
      {/* Subtítulo com estilo moderno */}
      {subtitle && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="text-blue-700 font-semibold text-sm tracking-wider uppercase">
            {subtitle}
          </span>
        </div>
      )}

      {/* Título Principal */}
      <h2 className={`text-3xl md:text-5xl font-bold ${titleColors[variant]} mt-4 mb-6 leading-tight`}>
        {title}
      </h2>
      
    </div>
  );
}