// src/components/layout/SchedulingSection.tsx

import { FaSpinner } from 'react-icons/fa';

// Nossos componentes de UI (agora todos existem)
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';     // <-- Deve funcionar agora
import { Textarea } from '../ui/Textarea';   // <-- Deve funcionar agora
import { SectionTitle } from '../ui/SectionTitle';

// Nossos dados e API


import type { AppointmentPayload } from '../../types/Types';
import { api } from '../../services/ApiFAke';
import { servicesData } from '../../lib/db';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';


export function SchedulingSection() {
  const today = new Date().toISOString().split('T')[0]; // Data de hoje

  // --- Estados do Componente ---
  const [formData, setFormData] = useState<AppointmentPayload>({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
    message: '',
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isTimeLoading, setIsTimeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // --- Efeito para buscar horários ---
  useEffect(() => {
    if (formData.date && formData.serviceId) {
      setIsTimeLoading(true);
      setAvailableTimes([]);
      
      api.getAvailableTimeSlots(formData.date, formData.serviceId)
        .then(response => {
          if (response.data) {
            setAvailableTimes(response.data);
          }
        })
        .finally(() => {
          setIsTimeLoading(false);
        });
    }
  }, [formData.date, formData.serviceId]);

  // --- Handlers ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (apiResponse) setApiResponse(null);

    if (name === 'date' || name === 'serviceId') {
      setFormData(prev => ({ ...prev, time: '' }));
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
        name: '', email: '', phone: '', serviceId: '',
        date: '', time: '', message: '',
      });
      setAvailableTimes([]);
    }
  };

  return (
    <section id="agendamento" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        
        <SectionTitle
          subtitle="Agende sua Avaliação"
          title="Estamos prontos para te atender"
          className="mb-12"
        />

        {/* Formulário de AGENDAMENTO */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
        >
          {/* Inputs de Contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Nome Completo" name="name" type="text" value={formData.name} onChange={handleChange} disabled={isLoading} required />
            <Input label="Telefone / WhatsApp" name="phone" type="tel" value={formData.phone} onChange={handleChange} disabled={isLoading} required />
          </div>
          <Input label="Seu melhor E-mail" name="email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} required />

          {/* Select de Serviço */}
          <Select label="Qual serviço você procura?" name="serviceId" value={formData.serviceId} onChange={handleChange} disabled={isLoading} required>
            <option value="" disabled>Selecione um serviço...</option>
            {servicesData.map(service => (
              <option key={service.title} value={service.title}>{service.title}</option>
            ))}
          </Select>

          {/* Inputs de Data e Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Data da Consulta" name="date" type="date" min={today} value={formData.date} onChange={handleChange} disabled={isLoading || !formData.serviceId} required />
            
            <Select label="Horário" name="time" value={formData.time} onChange={handleChange} disabled={isLoading || isTimeLoading || availableTimes.length === 0} required>
              <option value="" disabled>
                {isTimeLoading ? 'Buscando...' : (formData.date ? 'Selecione um horário' : 'Escolha uma data')}
              </option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </Select>
          </div>

          {/* Mensagem */}
          <Textarea label="Mensagem (Opcional)" name="message" placeholder="Deixe uma observação sobre sua consulta..." value={formData.message} onChange={handleChange} disabled={isLoading} />
          
          {/* Feedback API */}
          {apiResponse && (
            <div className={`p-3 rounded-md text-center ${apiResponse.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {apiResponse.message}
            </div>
          )}

          {/* Botão de Envio */}
          <Button type="submit" variant="primary" className="w-full flex justify-center items-center gap-2" disabled={isLoading || isTimeLoading}>
            {isLoading ? (<><FaSpinner className="animate-spin" /> Enviando...</>) : ('Solicitar Agendamento')}
          </Button>
        </form>
      </div>
    </section>
  );
}