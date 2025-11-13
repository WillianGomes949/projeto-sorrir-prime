// src/components/layout/ContactSection.tsx

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaSpinner,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { SectionTitle } from "../ui/SectionTitle";
import { contactData } from "../../lib/db";
import type { ContactFormPayload } from "../../types/Types";
import { api } from "../../services/ApiFAke";

export function ContactSection() {
  const { address, email, phone } = contactData;
  const [formData, setFormData] = useState<ContactFormPayload>({
    id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (apiResponse) {
      setApiResponse(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse(null);

    const response = await api.submitContactForm(formData);
    setIsLoading(false);
    setApiResponse(response);

    if (response.success) {
      setFormData({ id: "", name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <section
      id="contato"
      className="py-20 md:py-28 bg-linear-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          subtitle="Agende sua Avaliação"
          title="Estamos prontos para te atender"
          className="mb-16 text-center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                    <FaMapMarkerAlt className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-600 mt-1">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                    <FaWhatsapp className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600 mt-1">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-200 transition-colors">
                    <FaEnvelope className="text-purple-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">E-mail</h4>
                    <p className="text-gray-600 mt-1">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                    <FaClock className="text-orange-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Horário de Funcionamento
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Segunda a Sexta: 8h às 18h
                      <br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3393160655486!2d-38.50421862590249!3d-3.732724843930889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7478abc9a785d%3A0x70515131a403b01!2sAv.%20Beira%20Mar%2C%20Fortaleza%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1678886400000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-6 grid grid-cols-1 gap-6 justify-between"
          >
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Nome Completo"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <Input
                label="E-mail"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <Input
                label="Telefone"
                name="phone"
                type="tel"
                placeholder="(85) 9 9999-9999"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mensagem (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Conte-nos como podemos ajudar..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-8">
              {/* API Response */}
              {apiResponse && (
                <div
                  className={`p-4 rounded-xl text-center border ${
                    apiResponse.success
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {apiResponse.message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full flex justify-center items-center gap-3 py-4 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Enviando Mensagem...
                  </>
                ) : (
                  <>
                    <FaEnvelope />
                    Enviar Mensagem
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Entraremos em contato em até 24 horas
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
