// src/components/layout/ContactSection.tsx

// 1. Imports necessários
import { useState, type ChangeEvent, type FormEvent} from 'react'; // Hooks do React
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SectionTitle } from '../ui/SectionTitle';

// 2. Importando nossa API FAKE e os DADOS


// 3. (Opcional) Ícone de Loading
import { FaSpinner } from 'react-icons/fa';
import { contactData } from '../../lib/db';
import type { ContactFormPayload } from '../../types/Types';
import { api } from '../../services/ApiFAke';

export function ContactSection() {
  const { address, email, phone } = contactData;

  // 4. Estados do componente
  const [formData, setFormData] = useState<ContactFormPayload>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 5. Handler para ATUALIZAR o estado quando o usuário digita
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa a mensagem de resposta se o usuário voltar a digitar
    if (apiResponse) {
      setApiResponse(null);
    }
  };

  // 6. Handler para ENVIAR o formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página
    setIsLoading(true); // Ativa o "Carregando..."
    setApiResponse(null);

    // Chama nossa API Fake
    const response = await api.submitContactForm(formData);

    // Atualiza os estados com a resposta da API
    setIsLoading(false);
    setApiResponse(response);

    // Se a API retornou sucesso, limpa o formulário
    if (response.success) {
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Agende sua Avaliação"
          title="Estamos prontos para te atender"
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna 1: Informações e Mapa (sem alterações) */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Informações de Contato
              </h3>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-700 size-5" />
                <span className="text-gray-600">{address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-700 size-5" />
                <span className="text-gray-600">{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-700 size-5" />
                <span className="text-gray-600">{email}</span>
              </div>
            </div>
            <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3393160655486!2d-38.50421862590249!3d-3.732724843930889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7478abc9a785d%3A0x70515131a403b01!2sAv.%20Beira%20Mar%2C%20Fortaleza%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1678886400000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* 7. Coluna 2: Formulário ATUALIZADO */}
          <form
            onSubmit={handleSubmit} // <-- Adicionado
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          >
            {/* Inputs agora são "controlados" (value/onChange) */}
            <Input
              label="Nome Completo"
              name="name"
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading} // Desabilita enquanto carrega
              required
            />
            <Input
              label="Seu melhor E-mail"
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <Input
              label="Telefone / WhatsApp"
              name="phone"
              type="tel"
              placeholder="(85) 9..."
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            {/* Textarea (controlada) */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mensagem (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Como podemos te ajudar?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* 8. Feedback de Sucesso/Erro */}
            {apiResponse && (
              <div
                className={`p-3 rounded-md text-center ${
                  apiResponse.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {apiResponse.message}
              </div>
            )}

            {/* 9. Botão com estado de Loading */}
            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center items-center gap-2"
              disabled={isLoading} // Desabilita o botão
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}