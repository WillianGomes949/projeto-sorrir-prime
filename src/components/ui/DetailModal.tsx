// src/components/ui/DetailModal.tsx

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaTooth,
  FaSpinner,
  FaSave,
  FaPencilAlt,
} from "react-icons/fa";
import type { AppointmentPayload, ContactFormPayload } from "../../types/Types";
import { api, type ApiResponse } from "../../services/ApiFAke";
import { servicesData } from "../../lib/db";

// Componentes de UI (Inputs/Selects/Textarea) para edição
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

// 1. Tipos de dados completos para o modal
type ModalData = (AppointmentPayload | ContactFormPayload) & {
  id?: string;
  submittedAt?: string;
  serviceId?: string;
  date?: string;
  time?: string;
};

// 2. Props atualizadas para incluir a função onSaveSuccess
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
  type: "appointment" | "submission";
  onSaveSuccess: () => void;
}

export function DetailModal({
  isOpen,
  onClose,
  data,
  type,
  onSaveSuccess,
}: DetailModalProps) {
  // 3. Estados para controlar o formulário e a UI
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [formData, setFormData] = useState<ModalData>(data);

  // 4. Sincronizar o estado do formulário com a prop 'data'
  useEffect(() => {
    setFormData(data);
    setIsEditing(false);
    setApiResponse(null);
  }, [data, isOpen]);

  // 5. Handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse(null);

    if (!formData.id) {
      setApiResponse({
        success: false,
        message: "Erro: ID do item não encontrado.",
      });
      setIsLoading(false);
      return;
    }

    try {
      let response: ApiResponse;

      if (type === "appointment") {
        response = await api.editAppointment(formData as AppointmentPayload);
      } else {
        response = await api.editContactSubmission(formData as ContactFormPayload);
      }

      setApiResponse(response);

      if (response.success) {
        setIsEditing(false);
        onSaveSuccess();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      setApiResponse({ success: false, message });
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Funções auxiliares
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não informado";
    
    if (dateString.includes("T")) {
      return new Date(dateString).toLocaleDateString("pt-BR");
    }
    
    const [year, month, day] = dateString.split("-");
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    
    return dateString;
  };

  const getTypeLabel = () => type === "appointment" ? "Agendamento" : "Mensagem";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-90 zoom-in-90"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {isEditing ? "Editar" : "Detalhes do"} {getTypeLabel()}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                ID: {data.id || "N/A"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Informações Pessoais */}
          <Section title="Informações Pessoais">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome Completo"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Telefone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="E-mail"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    type="email"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InfoItem
                  icon={FaUser}
                  label="Nome Completo"
                  value={formData.name}
                />
                <InfoItem
                  icon={FaPhone}
                  label="Telefone"
                  value={formData.phone}
                />
                <InfoItem
                  icon={FaEnvelope}
                  label="E-mail"
                  value={formData.email}
                />
              </div>
            )}
          </Section>

          {/* Informações Específicas (só para Agendamento) */}
          {type === "appointment" && (
            <Section title="Detalhes do Agendamento">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Select
                      label="Serviço Solicitado"
                      name="serviceId"
                      value={formData.serviceId || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione um serviço...</option>
                      {servicesData.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Input
                    label="Data Preferencial"
                    name="date"
                    value={formData.date?.split("T")[0] || ""}
                    onChange={handleChange}
                    type="date"
                    required
                  />
                  <Input
                    label="Horário Preferencial"
                    name="time"
                    value={formData.time || ""}
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <InfoItem
                    icon={FaTooth}
                    label="Serviço Solicitado"
                    value={formData.serviceId}
                  />
                  <InfoItem
                    icon={FaCalendarAlt}
                    label="Data Preferencial"
                    value={formatDate(formData.date)}
                  />
                  <InfoItem
                    icon={FaClock}
                    label="Horário Preferencial"
                    value={formData.time}
                  />
                </div>
              )}
            </Section>
          )}

          {/* Mensagem */}
          <Section title="Mensagem e Observações">
            {isEditing ? (
              <Textarea
                label="Mensagem"
                name="message"
                value={formData.message || ""}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.message || "Nenhuma mensagem adicional."}
                </p>
              </div>
            )}
          </Section>

          {/* Feedback da API */}
          {apiResponse && (
            <div
              className={`p-4 rounded-lg text-center ${
                apiResponse.success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {apiResponse.message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex gap-2">
              <button
                type={isEditing ? "submit" : "button"}
                onClick={isEditing ? undefined : () => setIsEditing(true)}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : isEditing ? (
                  <FaSave />
                ) : (
                  <FaPencilAlt />
                )}
                {isLoading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Editar"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(data);
                    setApiResponse(null);
                  }}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isLoading}
            >
              Fechar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// --- Componentes Auxiliares ---
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
        <Icon className="text-blue-600 text-base" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2 text-sm border border-gray-200">
          {value || "Não informado"}
        </p>
      </div>
    </div>
  );
}