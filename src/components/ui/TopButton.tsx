// components/TopButton.tsx
import { useEffect, useState } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';
import { Button } from './Button';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora o scroll da página
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão se o scroll for maior que 300px
      if (window.pageYOffset > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        // 1. Container relativo para o tooltip (classe 'group')
        //    Posicionado fixo no canto da tela
        <div className="fixed bottom-6 right-6 z-50 group">
          <Button
            variant="outline"
            size="sm"
            rounded='full'
            iconPosition="right"
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            <RiArrowUpLine size={30}/>
          </Button>

          {/* 2. O Tooltip*/}
          <span
            className="absolute bottom-full mb-2 left-1/2 -translate-x-22
                       px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium
                       shadow-lg
                       transition-all duration-200 ease-in-out
                       scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100
                       origin-bottom whitespace-nowrap"
          >
            Voltar ao topo
          </span>
        </div>
      )}
    </>
  );
}