// src/services/ApiFake.ts

import type { AppointmentPayload, ContactFormPayload } from "../types/Types";

// 1. Definição de uma Resposta de API Padrão
// Uma API real sempre retorna um padrão (sucesso/erro/dados)
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// 2. Simular a latência da rede (1 segundo)
// Isso é CRUCIAL para que a gente possa testar "loading states"
const FAKE_DELAY = 1000;
const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, FAKE_DELAY));

// --- Nossas Funções de API Falsas ---

/**
 * Envia os dados do formulário de contato.
 * No mundo real, isso seria um POST para /api/v1/contact
 */

/**
 * SIMULA a busca por horários disponíveis em um dia.
 */
const getAvailableTimeSlots = async (
  date: string,
  serviceId: string
): Promise<ApiResponse<string[]>> => {
  await simulateDelay();

  console.log(
    `API FAKE: Buscando horários para ${date} e serviço ${serviceId}`
  );

  const fakeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  return {
    success: true,
    message: "Horários carregados.",
    data: fakeSlots,
  };
};

const submitContactForm = async (
  formData: ContactFormPayload
): Promise<ApiResponse> => {
  await simulateDelay(); // Simula o "carregando..."

  try {
    // Pegamos os envios antigos do localStorage (ou um array vazio)
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );

    // Adicionamos o novo envio com uma data
    const newSubmission = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };
    submissions.push(newSubmission);

    // Salvamos de volta no localStorage
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    console.log("API FAKE (localStorage):", submissions);

    // Retorna a mesma resposta que uma API real retornaria
    return { success: true, message: "Formulário enviado com sucesso!" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return {
      success: false,
      message: `Erro ao salvar no localStorage: ${message}`,
    };
  }
};

/**
 * Salva o agendamento no localStorage.
 */
const submitAppointment = async (
  formData: AppointmentPayload
): Promise<ApiResponse> => {
  await simulateDelay();

  try {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const newAppointment = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    console.log("API FAKE (localStorage) - Agendamentos:", appointments);

    return {
      success: true,
      message:
        "Agendamento enviado com sucesso! Entraremos em contato para confirmar.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao salvar: ${message}` };
  }
};

/**
 * Pega todos os envios de contato (só para testar)
 * No mundo real, isso seria um GET para /api/v1/contact
 */
const getContactSubmissions = async (): Promise<
  ApiResponse<ContactFormPayload[]>
> => {
  await simulateDelay();

  try {
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    return { success: true, message: "Dados carregados.", data: submissions };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao carregar: ${message}` };
  }
};

const getAppointments = async (): Promise<
  ApiResponse<AppointmentPayload[]>
> => {
  await simulateDelay(); // Simula o carregamento da rede
  try {
    // Busca os dados do localStorage
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    return {
      success: true,
      message: "Agendamentos carregados com sucesso.",
      data: appointments,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao carregar dados: ${message}` };
  }
};

// 3. Exportamos todas as funções em um único objeto 'api'
// Esta é a MÁGICA. Nossos componentes vão importar 'api'.
// No futuro, podemos criar 'ApiReal.ts' e só trocar a exportação.
export const api = {
  submitContactForm,
  getContactSubmissions,
  getAvailableTimeSlots,
  submitAppointment,
  getAppointments,
};
