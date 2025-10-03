import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, BookOpen, MessageCircle, Bell } from 'lucide-react';
import { eventsAPI, pollsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';

const GuardianDashboard = () => {
  const [events, setEvents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    name: "João Silva Santos",
    course: "Engenharia da Computação",
    semester: "6º Semestre",
    status: "Ativo"
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, pollsResponse] = await Promise.all([
        eventsAPI.getAll(),
        pollsAPI.getAll()
      ]);
      
      setEvents(eventsResponse.data);
      setPolls(pollsResponse.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getActivePolls = () => {
    return polls.filter(poll => poll.isActive).slice(0, 3);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-blue-700">Carregando informações do estudante...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      
      {/* Top Navigation */}
      <div className="bg-white shadow-lg border-b-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold">
                <span className="text-blue-900">No</span>
                <span className="text-yellow-500">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-blue-900 font-medium">Portal do Responsável</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-blue-700">Responsável por:</p>
                <p className="font-semibold text-blue-900">{studentInfo.name}</p>
              </div>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Portal do Responsável 👨‍👩‍👧‍👦
          </h1>
          <p className="text-blue-700 text-lg">
            Acompanhe a vida acadêmica e atividades do estudante na UNASP Engenheiro Coelho
          </p>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-blue-900">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            👨‍🎓 Informações do Estudante
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <User className="w-8 h-8 text-blue-900 mx-auto mb-2" />
              <p className="text-sm text-blue-700 mb-1">Nome Completo</p>
              <p className="font-bold text-blue-900">{studentInfo.name}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
              <BookOpen className="w-8 h-8 text-orange-700 mx-auto mb-2" />
              <p className="text-sm text-orange-700 mb-1">Curso</p>
              <p className="font-bold text-orange-700">{studentInfo.course}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
              <Calendar className="w-8 h-8 text-yellow-700 mx-auto mb-2" />
              <p className="text-sm text-yellow-700 mb-1">Período</p>
              <p className="font-bold text-yellow-700">{studentInfo.semester}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-700 mx-auto mb-2" />
              <p className="text-sm text-green-700 mb-1">Status</p>
              <p className="font-bold text-green-700">{studentInfo.status}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              📅 Próximos Eventos
            </h2>
            <div className="space-y-4">
              {getUpcomingEvents().map((event) => (
                <div key={event.id} className="border-2 border-orange-100 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 text-sm mb-1">{event.title}</h3>
                      <p className="text-blue-700 text-xs mb-2">{event.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {getUpcomingEvents().length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhum evento próximo encontrado</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Polls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              📊 Enquetes em Andamento
            </h2>
            <div className="space-y-4">
              {getActivePolls().map((poll) => (
                <div key={poll.id} className="border-2 border-yellow-100 rounded-xl p-4 hover:border-orange-300 transition-all">
                  <h3 className="font-bold text-blue-900 text-sm mb-3">{poll.title}</h3>
                  <p className="text-blue-700 text-xs mb-4">{poll.description}</p>
                  
                  <div className="space-y-2">
                    {poll.options?.map((option, index) => {
                      const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                      const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                      
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg p-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-blue-900">{option.text}</span>
                            <span className="text-xs text-blue-700">{option.votes} votos</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Enquete Ativa
                    </span>
                    <span className="text-xs text-blue-600">
                      {poll.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0} participações
                    </span>
                  </div>
                </div>
              ))}
              {getActivePolls().length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhuma enquete ativa no momento</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Communication and Important Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Communication Center */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              💬 Central de Comunicação
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-blue-900">Mensagem da Coordenação</span>
                  <span className="text-xs text-blue-700">Há 2 dias</span>
                </div>
                <p className="text-sm text-blue-800">
                  Informamos sobre as mudanças no calendário acadêmico para o próximo semestre.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-blue-900">Aviso Financeiro</span>
                  <span className="text-xs text-blue-700">Há 5 dias</span>
                </div>
                <p className="text-sm text-blue-800">
                  Mensalidade de dezembro com vencimento para 10/12. Acesse o portal financeiro.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-blue-900">Evento Importante</span>
                  <span className="text-xs text-blue-700">Há 1 semana</span>
                </div>
                <p className="text-sm text-blue-800">
                  Cerimônia de formatura será realizada em dezembro. Mais informações em breve.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              ⚡ Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg">
                <BookOpen className="w-8 h-8 text-blue-900 mb-2" />
                <span className="text-sm font-bold text-blue-900 text-center">Portal Acadêmico</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl hover:from-orange-200 hover:to-orange-300 transition-all shadow-md hover:shadow-lg">
                <MessageCircle className="w-8 h-8 text-orange-700 mb-2" />
                <span className="text-sm font-bold text-orange-700 text-center">Mensagens</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl hover:from-yellow-200 hover:to-yellow-300 transition-all shadow-md hover:shadow-lg">
                <Calendar className="w-8 h-8 text-yellow-700 mb-2" />
                <span className="text-sm font-bold text-yellow-700 text-center">Calendário Completo</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl hover:from-green-200 hover:to-green-300 transition-all shadow-md hover:shadow-lg">
                <Bell className="w-8 h-8 text-green-700 mb-2" />
                <span className="text-sm font-bold text-green-700 text-center">Notificações</span>
              </button>
            </div>
          </div>
        </div>

        {/* Important Alerts */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-orange-800 mb-2">⚠️ Avisos Importantes</h3>
                <div className="space-y-2">
                  <p className="text-sm text-orange-700">
                    • <strong>Período de Matrículas:</strong> De 15 a 30 de dezembro
                  </p>
                  <p className="text-sm text-orange-700">
                    • <strong>Recesso Acadêmico:</strong> 23 de dezembro a 6 de janeiro
                  </p>
                  <p className="text-sm text-orange-700">
                    • <strong>Início das Aulas:</strong> 10 de fevereiro de 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;