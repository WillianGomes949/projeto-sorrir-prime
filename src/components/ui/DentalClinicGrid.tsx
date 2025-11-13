import { IoDiamondOutline, IoCalendar } from "react-icons/io5";
import { Button } from "./Button";

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-2xl p-4 shadow-xl sh shadow-blue-200 backdrop-blur-sm bg-white/5 border border-white/10 ${className}`}
    >
      {children}
    </div>
  );
};

export default function DentalClinicGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto bg-linear-to-b from-white to-gray-50 text-gray-900 rounded-2xl py-24">
      {/* Top Left - Dentista atendendo */}
      <GridItem className="col-span-1 aspect-square md:aspect-auto overflow-hidden group">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src="/images/images-grid/dentist.webp"
            alt="Dentista atendendo paciente"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </GridItem>

      {/* Top Middle - Satisfação do Paciente */}
      <GridItem className="bg-linear-to-br from-cyan-500 to-blue-600 text-white col-span-1 flex-col justify-between aspect-square md:aspect-auto hidden md:flex">
        <div>
          <h3 className="md:text-4xl font-black mb-4">
            Satisfação dos Pacientes
          </h3>
          <div className="flex items-baseline">
            <span className="md:text-7xl font-black bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
              98%
            </span>
            <span className="ml-3 text-blue-200 md:text-xl font-medium">
              recomendam
            </span>
          </div>
        </div>
        <div className="w-full h-20 bg-blue-400/30 rounded-xl mt-4 p-2">
          <div className="w-full h-full bg-blue-300/20 rounded-lg flex items-center justify-center">
            <span className="text-blue-100 text-sm font-medium">
              Avaliações Positivas
            </span>
          </div>
        </div>
      </GridItem>

      {/* Top Right - Aparelho dentário */}
      <GridItem className="col-span-1 aspect-square md:aspect-auto overflow-hidden group">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src="images/images-grid/sorrisos.webp"
            alt="Aparelho dentário moderno"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </GridItem>

      {/* Middle Left - Cuide do Seu Sorriso */}
      <GridItem className="bg-linear-to-br from-blue-600 to-blue-700 text-white col-span-2 md:col-span-1 row-span-2 flex flex-col justify-between">
        <div>
          <h2 className="text-5xl font-black leading-tight bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Cuide do seu sorriso
          </h2>
          <p className="mt-6 text-blue-100 text-lg leading-relaxed">
            Tratamentos completos com planos acessíveis. Conquiste o sorriso dos
            seus sonhos com nossos especialistas.
          </p>
        </div>
        <div className="flex items-center mt-8 p-5 bg-blue-500/30 rounded-2xl backdrop-blur-sm border border-blue-400/20">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
            <div className="w-14 h-14 bg-linear-to-br from-white to-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-700 text-xs font-bold">
                <IoCalendar size={20} />
              </span>
            </div>
          </div>
          <div className="ml-5">
            <p className="font-semibold text-lg">Agende uma avaliação</p>
            <p className="text-blue-200 text-sm mt-1">
              Consulta gratuita com especialista
            </p>
          </div>
        </div>
      </GridItem>

      {/* Middle Center - Equipamento moderno */}
      <GridItem className="bg-white/80 col-span-2 md:col-span-1 p-0 overflow-hidden relative group">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="images/images-grid/limpeza.webp"
            alt="Equipamento dental moderno"
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-blue-50/50 to-transparent" />
        </div>
      </GridItem>

      {/* Middle Right - Planos Acessíveis */}
      <GridItem className="bg-linear-to-br from-emerald-400 to-green-500 col-span-1 flex flex-col justify-center items-center aspect-square md:aspect-auto text-white">
        <div className="text-center">
          <div className="flex items-center justify-center text-xl font-semibold mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3 hidden md:flex">
              <span className="text-white font-bold ">
                <IoDiamondOutline size={20} className="text-blue-400" />
              </span>
            </div>
            <span className="hidden md:block">Planos a partir de:</span>
            <span className="md:hidden">A partir de:</span>
          </div>
          <span className=" text-3xl md:text-6xl font-black bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            R$ 89
          </span>
          <p className="text-emerald-100 text-sm mt-2">/mês</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          rounded="full"
          className="hidden! md:block! mt-5 "
          href="/servicos"
          target="_blank"
        >
          Agendar agora
        </Button>
      </GridItem>

      {/* Bottom Right - Sorriso perfeito */}
      <GridItem className="col-span-1 aspect-square md:aspect-auto overflow-hidden group">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src="images/images-grid/paciente.webp"
            alt="Sorriso perfeito após tratamento"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </GridItem>
    </div>
  );
}
