const dentalServices = [
  { name: "Limpeza e Profilaxia" },
  { name: "Clareamento Dental" },
  { name: "Restaurações Estéticas" },
  { name: "Implantes Dentários" },
  { name: "Próteses" },
  { name: "Ortodontia (Aparelhos)" },
  { name: "Endodontia (Canal)" },
  { name: "Periodontia (Gengiva)" },
  { name: "Odontopediatria" },
  { name: "Cirurgias Orais" },
];

const DentalServicesMarquee = () => {
  // Duplica o array para criar um efeito de loop contínuo
  const duplicatedServices = [
    ...dentalServices,
    ...dentalServices,
    ...dentalServices,
    ...dentalServices,
  ];

  return (
    <div className="-translate-y-8 w-full h-15 bg-linear-to-l from-blue-400 to-cyan-100 md:py-12 flex justify-center items-center group">
      <div className="inset-0 max-w-7xl mx-auto px-4 mask-x-from-90% mask-x-to-95%">
        <div className="overflow-hidden">
          <div
            className="flex space-x-8
             animate-scroll"
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`${service.name}-${index}`}
                className="shrink-0 flex items-center justify-center space-x-8"
              >
                <span className="text-gray-800 font-medium text-sm whitespace-nowrap">
                  {service.name.toLocaleUpperCase()}
                </span>

                {/* Separador */}
                {index < duplicatedServices.length - 1 && (
                  <div className="w-2 h-2 bg-gray-400 rounded-full shrink-0 opacity-60"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalServicesMarquee;
