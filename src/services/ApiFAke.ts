// src/services/ApiFake.ts

import type { AppointmentPayload, ContactFormPayload } from "../types/Types";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

const FAKE_DELAY = 1000;
const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, FAKE_DELAY));

// Funções existentes mantidas...
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
  await simulateDelay();

  try {
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );

    const newSubmission = {
      ...formData,
      id: Date.now().toString(), // Adiciona ID único
      submittedAt: new Date().toISOString(),
    };
    submissions.push(newSubmission);

    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    console.log("API FAKE (localStorage):", submissions);

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
      id: Date.now().toString(), // Adiciona ID único
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

const getContactSubmissions = async (): Promise<ApiResponse<ContactFormPayload[]>> => {
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

const getAppointments = async (): Promise<ApiResponse<AppointmentPayload[]>> => {
  await simulateDelay();
  try {
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

// NOVAS FUNÇÕES DE DELETE
const deleteAppointment = async (id: string): Promise<ApiResponse> => {
  await simulateDelay();

  try {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    
    const filteredAppointments = appointments.filter((apt: any) => apt.id !== id);
    
    localStorage.setItem("appointments", JSON.stringify(filteredAppointments));

    console.log("API FAKE: Agendamento deletado - ID:", id);
    
    return {
      success: true,
      message: "Agendamento excluído com sucesso.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao excluir agendamento: ${message}` };
  }
};

const deleteContactSubmission = async (id: string): Promise<ApiResponse> => {
  await simulateDelay();

  try {
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    
    const filteredSubmissions = submissions.filter((sub: any) => sub.id !== id);
    
    localStorage.setItem("contactSubmissions", JSON.stringify(filteredSubmissions));

    console.log("API FAKE: Submissão de contato deletada - ID:", id);
    
    return {
      success: true,
      message: "Mensagem de contato excluída com sucesso.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao excluir mensagem: ${message}` };
  }
};
// NOVA FUNÇÃO DE EDITAR AGENDAMENTO
const editAppointment = async (
  updatedData: AppointmentPayload & { id: string }
): Promise<ApiResponse> => {
  await simulateDelay();

  try {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    
    // Encontra o índice do agendamento a ser editado
    const index = appointments.findIndex((apt: any) => apt.id === updatedData.id);

    if (index === -1) {
      return { success: false, message: "Agendamento não encontrado." };
    }
    
    // Preserva os dados originais (como submittedAt) e mescla com os novos dados
    const originalItem = appointments[index];
    appointments[index] = { ...originalItem, ...updatedData };
    
    localStorage.setItem("appointments", JSON.stringify(appointments));

    console.log("API FAKE: Agendamento editado - ID:", updatedData.id);
    
    return {
      success: true,
      message: "Agendamento atualizado com sucesso.",
      data: appointments[index], // Retorna o dado atualizado
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao editar agendamento";
    return { success: false, message };
  }
};

// NOVA FUNÇÃO DE EDITAR MENSAGEM DE CONTATO
const editContactSubmission = async (
  updatedData: ContactFormPayload & { id: string }
): Promise<ApiResponse> => {
  await simulateDelay();

  try {
    const submissions = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    
    // Encontra o índice da mensagem a ser editada
    const index = submissions.findIndex((sub: any) => sub.id === updatedData.id);

    if (index === -1) {
      return { success: false, message: "Mensagem não encontrada." };
    }

    // Preserva os dados originais e mescla com os novos
    const originalItem = submissions[index];
    submissions[index] = { ...originalItem, ...updatedData };
    
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

    console.log("API FAKE: Submissão de contato editada - ID:", updatedData.id);
    
    return {
      success: true,
      message: "Mensagem de contato atualizada com sucesso.",
      data: submissions[index], // Retorna o dado atualizado
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao editar mensagem";
    return { success: false, message };
  }
};

// Função para visualizar detalhes (simulação)
const getDetails = async (id: string, type: 'appointment' | 'submission'): Promise<ApiResponse> => {
  await simulateDelay();
  
  try {
    const storageKey = type === 'appointment' ? 'appointments' : 'contactSubmissions';
    const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const item = items.find((item: any) => item.id === id);
    
    if (item) {
      return {
        success: true,
        message: "Detalhes carregados com sucesso.",
        data: item
      };
    } else {
      return {
        success: false,
        message: "Item não encontrado."
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return { success: false, message: `Erro ao carregar detalhes: ${message}` };
  }
};

export const api = {
  submitContactForm,
  getContactSubmissions,
  getAvailableTimeSlots,
  submitAppointment,
  getAppointments,
  deleteAppointment,
  deleteContactSubmission,
  getDetails,
  editAppointment,
  editContactSubmission,

};