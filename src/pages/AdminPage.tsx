// src/pages/AdminPage.tsx

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { AppointmentPayload } from "../types/Types";
import { api } from "../services/ApiFAke";
import { SectionTitle } from "../components/ui/SectionTitle";

export function AdminPage() {
  const [appointments, setAppointments] = useState<AppointmentPayload[]>([]);
  const [submissions, setSubmissions] = useState<AppointmentPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Efeito para buscar os dados quando a página carregar
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      const response = await api.getAppointments(); // Chama nossa nova função

      if (response.success && response.data) {
        setAppointments(response.data);
      } else {
        setError(response.message);
      }
      setIsLoading(false);
    };

    fetchAppointments();
  }, []); // O array vazio [] faz isso rodar só uma vez

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      setError(null);
      const response = await api.getContactSubmissions();

      if (response.success && response.data) {
        setSubmissions(response.data);
      } else {
        setError(response.message);
      }
      setIsLoading(false);
    };

    fetchSubmissions();
  }, []);

  // 2. Função para renderizar o conteúdo (Loading, Erro, Tabela)
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-12">
          <FaSpinner className="animate-spin size-8 text-blue-700" />
          <span className="ml-4 text-lg">Carregando solicitações...</span>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-600">{error}</p>;
    }

    if (appointments.length === 0) {
      return (
        <p className="text-center text-gray-600">
          Nenhuma solicitação de agendamento encontrada.
        </p>
      );
    }
    if (submissions.length === 0) {
      return (
        <p className="text-center text-gray-600">
          Nenhuma solicitação de agendamento encontrada.
        </p>
      );
    }

    // 3. Renderiza a tabela com os dados
    return (
      <section className="flex flex-col gap-8">
        <SectionTitle
        subtitle="Painel Administrativo"
        title="Solicitações de Agendamento"
        className="pt-16 mb-12"
      />
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Telefone</th>
                <th className="py-3 px-4 text-left">E-mail</th>
                <th className="py-3 px-4 text-left">Serviço</th>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Hora</th>
                <th className="py-3 px-4 text-left">Mensagem</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {appointments.map((app, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4">{app.phone}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.serviceId}</td>
                  <td className="py-3 px-4">{app.date}</td>
                  <td className="py-3 px-4">{app.time}</td>
                  <td className="py-3 px-4 truncate max-w-xs">
                    {app.message || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SectionTitle
        title="Mensagens de Contato"
        className="pt-16 mb-12"
      />
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Telefone</th>
                <th className="py-3 px-4 text-left">E-mail</th>
                <th className="py-3 px-4 text-left">Serviço</th>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Hora</th>
                <th className="py-3 px-4 text-left">Mensagem</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {submissions.map((app, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4">{app.phone}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.serviceId}</td>
                  <td className="py-3 px-4">{app.date}</td>
                  <td className="py-3 px-4">{app.time}</td>
                  <td className="py-3 px-4 truncate max-w-xs">
                    {app.message || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    // pt-20 para compensar o Header fixo
    <div className="pt-20 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 pb-16">{renderContent()}</div>
    </div>
  );
}
