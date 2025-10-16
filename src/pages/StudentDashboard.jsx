import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, Bell, TrendingUp, ChevronRight, MapPin, Star } from 'lucide-react';
import { eventsAPI, pollsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

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
      setPolls(pollsResponse.data.filter(poll => poll.isActive));
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar os dias do calendário
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const hasEvent = events.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        hasEvent
      });
    }
    
    return days;
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const importantDates = [
    { date: '15 Out', title: 'Entrega Final - Projeto TCC', type: 'deadline', description: 'Prazo limite para entrega' },
    { date: '18 Out', title: 'Início da Semana de Provas', type: 'exam', description: '1ª Avaliação Bimestral' },
    { date: '25 Out', title: 'Recesso Escolar', type: 'holiday', description: 'Não haverá aulas' },
    { date: '28 Out', title: 'Servidor Público', type: 'holiday', description: 'Feriado Nacional' },
    { date: '01 Nov', title: 'Abertura Matrículas 2026.1', type: 'registration', description: 'Período de matrícula' },
    { date: '15 Nov', title: 'Proclamação da República', type: 'holiday', description: 'Feriado Nacional' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200/15 to-pink-200/15 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-white via-blue-50/50 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-indigo-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold">
                <span className="text-blue-900">No</span>
                <span className="text-yellow-500">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-blue-900 font-medium">Dashboard do Estudante</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/events" className="text-blue-900 hover:text-orange-500 transition-colors font-medium">Eventos</a>
              <a href="/polls" className="text-blue-900 hover:text-orange-500 transition-colors font-medium">Enquetes</a>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8 text-center relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 bg-clip-text text-transparent mb-4">
            Bem-vindo de volta! 🎓
          </h1>
          <p className="text-blue-700 text-xl font-medium">
            Acompanhe suas atividades acadêmicas no UNASP Engenheiro Coelho
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-xl p-6 border border-blue-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Eventos Este Mês</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">{events.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Calendar className="w-10 h-10 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-xl p-6 border border-orange-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium">Enquetes Ativas</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{polls.length}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <TrendingUp className="w-10 h-10 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-3xl shadow-xl p-6 border border-yellow-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-medium">Próximos Eventos</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{upcomingEvents.length}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Clock className="w-10 h-10 text-yellow-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-xl p-6 border border-green-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium">Minhas Votações</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">8</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 via-green-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-blue-900">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900">📅 Calendário</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    className="p-2 hover:bg-blue-100 rounded-full text-blue-900 transition-colors"
                  >
                    ←
                  </button>
                  <span className="font-bold text-blue-900 min-w-[120px] text-center">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </span>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    className="p-2 hover:bg-blue-100 rounded-full text-blue-900 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-blue-900 py-2 bg-blue-50 rounded">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  const dayEvents = events.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === day.date.toDateString();
                  });
                  
                  return (
                    <div
                      key={index}
                      className={`
                        text-center py-3 text-sm cursor-pointer rounded-lg transition-all relative group
                        ${day.isCurrentMonth ? 'text-blue-900' : 'text-gray-300'}
                        ${day.isToday ? 'bg-orange-500 text-white font-bold shadow-lg' : 
                          day.hasEvent ? 'bg-yellow-100 hover:bg-yellow-200 text-blue-900 font-semibold' : 
                          'hover:bg-blue-50'}
                      `}
                      onClick={() => {
                        if (dayEvents.length > 0) {
                          setSelectedDayEvents(dayEvents);
                        }
                      }}
                      title={dayEvents.length > 0 ? dayEvents.map(e => e.title).join(', ') : ''}
                    >
                      {day.date.getDate()}
                      {day.hasEvent && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {dayEvents.slice(0, 3).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-blue-900">Hoje</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                  <span className="text-blue-900">Com Eventos</span>
                </div>
              </div>
            </div>

            {/* Selected Day Events */}
            {selectedDayEvents.length > 0 && (
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl shadow-lg p-4 mb-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
                  🎯 Eventos do Dia Selecionado
                  <button 
                    onClick={() => setSelectedDayEvents([])}
                    className="ml-auto text-orange-500 hover:text-orange-700 text-sm"
                  >
                    ✕
                  </button>
                </h3>
                <div className="space-y-2">
                  {selectedDayEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg p-3 shadow-sm">
                      <h4 className="font-semibold text-blue-900 text-sm">{event.title}</h4>
                      <p className="text-blue-700 text-xs">{event.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Dates */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 text-orange-500 mr-2" />
                📌 Datas Importantes
              </h3>
              <div className="space-y-3">
                {importantDates.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md ${
                      item.type === 'deadline' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                      item.type === 'exam' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                      item.type === 'holiday' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-600 to-blue-700'
                    }`}>
                      {item.date}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-blue-900 text-sm mb-1">{item.title}</p>
                      <p className="text-blue-700 text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-900">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900 flex items-center">
                  🎆 Próximos Eventos
                </h2>
                <a href="/events" className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center bg-orange-50 px-3 py-1 rounded-full transition-colors">
                  Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-2 border-blue-100 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-blue-900 mb-2 text-lg">{event.title}</h3>
                        <p className="text-blue-700 text-sm mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-blue-600">
                          <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </div>
                          {event.location && (
                            <div className="flex items-center bg-orange-100 px-2 py-1 rounded-full">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`px-3 py-2 rounded-full text-xs font-bold shadow-sm ${
                        event.category === 'Tecnologia' ? 'bg-blue-500 text-white' :
                        event.category === 'Design' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-blue-900'
                      }`}>
                        {event.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Polls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900 flex items-center">
                  📊 Enquetes Ativas
                </h2>
                <a href="/polls" className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center bg-orange-50 px-3 py-1 rounded-full transition-colors">
                  Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              
              <div className="space-y-4">
                {polls.slice(0, 2).map((poll) => (
                  <div key={poll.id} className="border-2 border-orange-100 rounded-xl p-5 bg-gradient-to-r from-white to-orange-50 hover:shadow-md transition-all">
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">{poll.title}</h3>
                    {poll.description && (
                      <p className="text-blue-700 text-sm mb-4">{poll.description}</p>
                    )}
                    
                    <div className="space-y-3 mb-4">
                      {poll.options?.slice(0, 3).map((option) => {
                        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                        
                        return (
                          <div key={option.id} className="">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-blue-900">{option.text}</span>
                              <span className="text-sm font-bold text-orange-600">{percentage}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-orange-400 to-yellow-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all text-sm font-bold shadow-md">
                      🗳️ Votar Agora
                    </button>
                  </div>
                ))}
                
                {polls.length === 0 && (
                  <div className="text-center py-8">
                    <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma enquete ativa</h3>
                    <p className="text-gray-500">Novas enquetes aparecerão aqui quando estiverem disponíveis.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                ⚡ Ações Rápidas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <a href="/events" className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all cursor-pointer shadow-md hover:shadow-lg">
                  <Calendar className="w-8 h-8 text-blue-900 mb-2" />
                  <span className="text-sm font-bold text-blue-900">Ver Eventos</span>
                </a>
                <a href="/polls" className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl hover:from-orange-200 hover:to-orange-300 transition-all cursor-pointer shadow-md hover:shadow-lg">
                  <TrendingUp className="w-8 h-8 text-orange-700 mb-2" />
                  <span className="text-sm font-bold text-orange-700">Enquetes</span>
                </a>
                <button className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl hover:from-yellow-200 hover:to-yellow-300 transition-all shadow-md hover:shadow-lg">
                  <BookOpen className="w-8 h-8 text-yellow-700 mb-2" />
                  <span className="text-sm font-bold text-yellow-700">Biblioteca</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl hover:from-blue-200 hover:to-indigo-300 transition-all shadow-md hover:shadow-lg">
                  <Bell className="w-8 h-8 text-blue-700 mb-2" />
                  <span className="text-sm font-bold text-blue-700">Notificações</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-100 to-red-200 rounded-xl hover:from-orange-200 hover:to-red-300 transition-all shadow-md hover:shadow-lg">
                  <Star className="w-8 h-8 text-red-700 mb-2" />
                  <span className="text-sm font-bold text-red-700">Meus Favoritos</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl hover:from-yellow-200 hover:to-orange-300 transition-all shadow-md hover:shadow-lg">
                  <Users className="w-8 h-8 text-orange-700 mb-2" />
                  <span className="text-sm font-bold text-orange-700">Comunidade</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;