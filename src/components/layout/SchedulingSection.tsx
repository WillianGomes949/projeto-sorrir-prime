// src/components/layout/SchedulingSection.tsx

import {
  FaSpinner,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { SectionTitle } from "../ui/SectionTitle";
import type { AppointmentPayload } from "../../types/Types";
import { api } from "../../services/ApiFAke";
import { servicesData } from "../../lib/db";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FiAlertTriangle, FiLock } from "react-icons/fi";

export function SchedulingSection() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<AppointmentPayload>({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
    message: "",
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isTimeLoading, setIsTimeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (formData.date && formData.serviceId) {
      setIsTimeLoading(true);
      setAvailableTimes([]);

      api
        .getAvailableTimeSlots(formData.date, formData.serviceId)
        .then((response) => {
          if (response.data) {
            setAvailableTimes(response.data);
          }
        })
        .finally(() => {
          setIsTimeLoading(false);
        });
    }
  }, [formData.date, formData.serviceId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (apiResponse) setApiResponse(null);

    if (name === "date" || name === "serviceId") {
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse(null);

    const response = await api.submitAppointment(formData);

    setIsLoading(false);
    setApiResponse(response);

    if (response.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceId: "",
        date: "",
        time: "",
        message: "",
      });
      setAvailableTimes([]);
    }
  };

  return (
    <section
      id="agendamento"
      className="py-20 md:py-28 bg-linear-to-br from-blue-50 to-cyan-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full -translate-y-48 translate-x-48 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200 rounded-full translate-y-32 -translate-x-32 opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          subtitle="Agende sua Avaliação"
          title="Seu sorriso perfeito começa aqui"
          className="mb-16 text-center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Informações Laterais */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" />
                Como Funciona
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Preencha o Formulário
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Forneça seus dados básicos e preferências
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Escolha Data e Horário
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Selecione um horário disponível
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Confirmação Rápida
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Entraremos em contato para confirmar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Destaque */}
            <div className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white">
              <h4 className="font-bold text-lg mb-3 flex justify-center items-center gap-4">
                <FiAlertTriangle size={30} /> <span>Vagas Limitadas</span>
              </h4>
              <p className="text-blue-100 text-sm text-center">
                Garanta seu horário preferencial. Nossos especialistas têm
                agenda concorrida.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 space-y-8"
            >
              {/* Informações Pessoais */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <FaUser className="text-blue-600" />
                  Seus Dados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nome Completo"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    icon={FaUser}
                  />
                  <Input
                    label="Telefone / WhatsApp"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    icon={FaPhone}
                  />
                </div>

                <Input
                  label="Seu melhor E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  icon={FaEnvelope}
                />
              </div>

              {/* Serviço e Agendamento */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-600" />
                  Agendamento
                </h3>

                <Select
                  label="Qual serviço você procura?"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                >
                  <option value="" disabled>
                    Selecione um serviço...
                  </option>
                  {servicesData.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </Select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Data da Consulta"
                    name="date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    disabled={isLoading || !formData.serviceId}
                    required
                    icon={FaCalendarAlt}
                  />

                  <Select
                    label="Horário Disponível"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={
                      isLoading || isTimeLoading || availableTimes.length === 0
                    }
                    required
                    icon={FaClock}
                  >
                    <option value="" disabled>
                      {isTimeLoading ? (
                        <span className="flex items-center gap-2">
                          <FaSpinner className="animate-spin" />
                          Buscando horários...
                        </span>
                      ) : formData.date ? (
                        "Selecione um horário"
                      ) : (
                        "Escolha uma data"
                      )}
                    </option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Mensagem */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Observações</h3>
                <Textarea
                  label="Mensagem (Opcional)"
                  name="message"
                  placeholder="Deixe uma observação sobre sua consulta, sintomas ou dúvidas..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Feedback API */}
              {apiResponse && (
                <div
                  className={`p-4 rounded-xl border ${
                    apiResponse.success
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        apiResponse.success ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {apiResponse.success ? "✓" : "!"}
                    </div>
                    {apiResponse.message}
                  </div>
                </div>
              )}

              {/* Botão de Envio */}
              <Button
                type="submit"
                variant="primary"
                className="w-full flex justify-center items-center gap-3 py-4 text-lg font-semibold"
                disabled={isLoading || isTimeLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processando Agendamento...
                  </>
                ) : (
                  <>
                    <FaCalendarAlt />
                    Confirmar Agendamento
                  </>
                )}
              </Button>

              <p className="flex justify-center items-center gap-4 text-center text-sm text-gray-500">
                <FiLock
                  size={20}
                  className="text-amber-600 text-shadow-amber-900 shadow-2xl"
                />
                <span>
                  Seus dados estão seguros. Não compartilhamos informações com
                  terceiros.
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
