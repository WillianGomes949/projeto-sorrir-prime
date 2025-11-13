// src/components/layout/AboutClinic.tsx

import {
  FaCheckCircle,
  FaAward,
  FaUserMd,
  FaClinicMedical,
} from "react-icons/fa";
import { SectionTitle } from "../ui/SectionTitle";
import { aboutData } from "../../lib/db";

export function AboutClinic() {
  const { subtitle, title, description, feature1, feature2, feature3 } =
    aboutData;

  const stats = [
    { icon: FaUserMd, value: "10+", label: "Especialistas" },
    { icon: FaAward, value: "5+", label: "Anos de Experiência" },
    { icon: FaClinicMedical, value: "2K+", label: "Pacientes Atendidos" },
  ];

  return (
    <section
      id="sobre"
      className="py-20 md:py-28 bg-linear-to-b from-white to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionTitle
          subtitle={subtitle}
          title={title}
          className="mb-16 text-center"
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative group">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <img
                src="/images/images-grid/sorrisos.webp"
                alt="Interior da Clínica SorrirPrime"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaAward className="text-green-600 text-xl" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Excelência</div>
                  <div className="text-sm text-gray-600">Certificada</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Features List */}
            <ul className="space-y-4">
              {[feature1, feature2, feature3].map((feature, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FaCheckCircle className="text-blue-600 text-lg" />
                  </div>
                  <span className="text-gray-700 pt-1.5">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:shadow-xl transition-shadow">
                    <stat.icon className="text-blue-600 text-2xl" />
                  </div>
                  <div className="font-bold text-2xl text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
