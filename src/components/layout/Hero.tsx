// src/components/layout/Hero.tsx
// (Ou src/components/sections/Hero.tsx, dependendo da sua pasta)

import { Button } from "../ui/Button"; // Importando nosso botão

export function Hero() {
  return (
    // 'pt-20' ou 'pt-16' para compensar a altura do Header fixo
    <section 
      id="inicio" 
      className="relative flex items-center min-h-screen bg-cover bg-center bg-no-repeat pt-20"
      // Adicione sua imagem de fundo aqui
      // Sugestão: Crie uma pasta 'src/assets/images' e coloque a foto lá
      // style={{ backgroundImage: "url('/src/assets/images/clinic-hero-bg.jpg')" }}
    >
      {/* Overlay (Opcional, mas recomendado para legibilidade) */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Container do Conteúdo */}
      <div className="container mx-auto p-4 relative z-10">
        <div className="max-w-2xl text-white"> {/* Texto branco se o fundo for escuro */}
          
          {/* Subtítulo (Opcional) */}
          <span className="text-lg font-semibold text-blue-300">
            Clínica SorrirPrime
          </span>

          {/* Título Principal (Headline) */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-6 leading-tight">
            Cuidando do seu sorriso em Fortaleza com tecnologia e carinho.
          </h1>

          {/* Texto de Apoio */}
          <p className="text-lg text-gray-200 mb-8">
            Agende uma consulta e descubra como nossa equipe especializada pode 
            transformar seu sorriso com os tratamentos mais modernos.
          </p>

          {/* Botões de Ação (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "#contato")}
            >
              Agendar Consulta
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "#servicos")}
            >
              Ver Serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}