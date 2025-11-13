// src/pages/AdminPage.tsx

import { useEffect, useState, useCallback } from "react";
import { api } from "../services/ApiFAke";
import { SectionTitle } from "../components/ui/SectionTitle";
import { DetailModal } from "../components/ui/DetailModal"; 
import { 
  FaCheck, 
  FaEye, 
  FaSpinner, 
  FaTimes, 
  FaTrash, 
  FaCalendarAlt,
  FaEnvelope,
  FaChartBar,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import type { AppointmentPayload, ContactFormPayload } from "../types/Types";

// --- Tipos ---
interface BasePayload {
  id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
}

type AdminData = {
  appointments: AppointmentPayload[];
  submissions: ContactFormPayload[];
};

type LoadingStates = {
  appointments: boolean;
  submissions: boolean;
  actions: boolean;
};

// Componente de Card de Estatística
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend >= 0 ? '↗' : '↘'}</span>
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Componente de Tabela Separado
interface AdminTableProps {
  data: (AppointmentPayload | ContactFormPayload)[];
  type: 'appointments' | 'submissions';
  onViewDetails: (id: string) => void;
  onDelete: (id: string, item: BasePayload) => void;
  actionLoading: string | null;
}

function AdminTable({ data, type, onViewDetails, onDelete, actionLoading }: AdminTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phone.includes(searchTerm)
  );

  if (data.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-500 text-lg">Nenhuma solicitação encontrada</p>
        <p className="text-gray-400 text-sm mt-1">Quando houver novas solicitações, elas aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header da Tabela com Busca */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredData.length} de {data.length} itens
            </span>
          </div>
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Cliente</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Contato</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">
                {type === 'appointments' ? 'Serviço' : 'Tipo'}
              </th>
              {type === 'appointments' && (
                <>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Data</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Hora</th>
                </>
              )}
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Status</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-sm">ID: {item.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-900 font-medium">{item.phone}</div>
                  <div className="text-gray-500 text-sm">{item.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {type === 'appointments' ? (item as AppointmentPayload).serviceId : 'Contato'}
                  </span>
                </td>
                {type === 'appointments' && (
                  <>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 font-medium">
                        {(item as AppointmentPayload).date}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {(item as AppointmentPayload).time}
                      </span>
                    </td>
                  </>
                )}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    Novo
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 border border-blue-200"
                      title="Ver detalhes"
                      onClick={() => onViewDetails(item.id)}
                      disabled={!!actionLoading}
                    >
                      {actionLoading === item.id ? <FaSpinner className="animate-spin" /> : <FaEye />}
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 border border-red-200"
                      title="Excluir"
                      onClick={() => onDelete(item.id, item)}
                      disabled={!!actionLoading}
                    >
                      {actionLoading === item.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente de Mensagem de Ação
interface ActionMessageProps {
  message: { type: 'success' | 'error', text: string } | null;
}

function ActionMessage({ message }: ActionMessageProps) {
  if (!message) return null;

  return (
    <div className={`p-4 rounded-xl border ${
      message.type === 'success' 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      <div className="flex items-center gap-3">
        {message.type === 'success' ? 
          <FaCheck className="text-emerald-600 shrink-0" /> :
          <FaTimes className="text-red-600 shrink-0" />
        }
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );
}

// Função de validação de dados
const validateData = (appointments: any, submissions: any): boolean => {
  return (
    Array.isArray(appointments) &&
    Array.isArray(submissions) &&
    appointments.every((item: any) => item && typeof item.id === 'string') &&
    submissions.every((item: any) => item && typeof item.id === 'string')
  );
};

export function AdminPage() {
  const [data, setData] = useState<AdminData>({ appointments: [], submissions: [] });
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    appointments: true,
    submissions: true,
    actions: false
  });
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'submissions'>('appointments');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AppointmentPayload | ContactFormPayload | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'appointment' | 'submission'>('appointment');

  // Buscar dados com useCallback
  const fetchData = useCallback(async () => {
    setLoadingStates(prev => ({
      ...prev,
      appointments: true,
      submissions: true
    }));
    setError(null);
    
    try {
      const [appointmentsResponse, submissionsResponse] = await Promise.all([
        api.getAppointments(),
        api.getContactSubmissions()
      ]);

      if (appointmentsResponse.success && submissionsResponse.success) {
        if (validateData(appointmentsResponse.data, submissionsResponse.data)) {
          setData({
            appointments: (appointmentsResponse.data || []) as AppointmentPayload[],
            submissions: (submissionsResponse.data || []) as ContactFormPayload[]
          });
        } else {
          console.error('Dados inválidos da API:', { appointmentsResponse, submissionsResponse });
          setError('Erro: Dados recebidos em formato inválido.');
        }
      } else {
        const errorMsg = appointmentsResponse.message || submissionsResponse.message || 'Erro ao carregar dados.';
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        appointments: false,
        submissions: false
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cleanup de timeouts
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  // Abrir o modal
  const handleViewDetails = async (id: string) => {
    setActionLoading(id);
    const itemType = activeTab === 'appointments' ? 'appointment' : 'submission';
    
    try {
      const response = await api.getDetails(id, itemType);
      
      if (response.success && response.data) {
        setSelectedItem(response.data);
        setSelectedItemType(itemType);
        setIsModalOpen(true);
      } else {
        setActionMessage({ 
          type: 'error', 
          text: response.message || 'Erro ao carregar detalhes.' 
        });
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes:', err);
      setActionMessage({ type: 'error', text: 'Erro ao carregar detalhes.' });
    } finally {
      setActionLoading(null);
    }
  };

  // Fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Função para lidar com sucesso na edição
  const handleSaveSuccess = async () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    
    setActionMessage({ type: 'success', text: 'Item atualizado com sucesso!' });
    await fetchData();
  };

  // Função de deletar
  const handleDelete = async (id: string, item: BasePayload) => {
    if (!confirm(`Tem certeza que deseja excluir o ${activeTab === 'appointments' ? 'agendamento' : 'contato'} de ${item.name}?`)) {
      return;
    }

    setActionLoading(id);
    setActionMessage(null);
    
    try {
      const response = activeTab === 'appointments' 
        ? await api.deleteAppointment(id)
        : await api.deleteContactSubmission(id);
      
      if (response.success) {
        setActionMessage({ type: 'success', text: response.message });
        await fetchData();
      } else {
        setActionMessage({ type: 'error', text: response.message });
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
      setActionMessage({ type: 'error', text: 'Erro ao excluir item.' });
    } finally {
      setActionLoading(null);
    }
  };

  const isLoading = loadingStates.appointments && loadingStates.submissions;
  const currentData = activeTab === 'appointments' ? data.appointments : data.submissions;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        
        <SectionTitle
          subtitle="Painel Administrativo"
          title="Gerenciamento de Solicitações"
          className="mb-8 text-center"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Agendamentos"
            value={data.appointments.length}
            icon={<FaCalendarAlt className="text-white text-xl" />}
            color="bg-linear-to-r from-blue-500 to-blue-600"
           
          />
          <StatCard
            title="Mensagens de Contato"
            value={data.submissions.length}
            icon={<FaEnvelope className="text-white text-xl" />}
            color="bg-linear-to-r from-cyan-500 to-cyan-600"
            
          />
          <StatCard
            title="Total de Solicitações"
            value={data.appointments.length + data.submissions.length}
            icon={<FaChartBar className="text-white text-xl" />}
            color="bg-linear-to-r from-violet-500 to-violet-600"
            
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-2 border border-gray-200">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'appointments'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'submissions'
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mensagens
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Mensagem de Erro */}
          {error && (
            <ActionMessage message={{ type: 'error', text: error }} />
          )}

          {/* Mensagem de Ação */}
          <ActionMessage message={actionMessage} />

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center">
                <FaSpinner className="animate-spin size-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Carregando solicitações...</p>
                <p className="text-gray-400 text-sm mt-1">Isso pode levar alguns segundos</p>
              </div>
            </div>
          ) : (
            <AdminTable
              data={currentData}
              type={activeTab}
              onViewDetails={handleViewDetails}
              onDelete={handleDelete}
              actionLoading={actionLoading}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedItem}
          type={selectedItemType}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}