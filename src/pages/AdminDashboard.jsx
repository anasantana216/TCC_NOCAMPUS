import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Settings, Plus, FileText, Eye } from 'lucide-react';
import { eventsAPI, pollsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalPolls: 0,
    totalParticipations: 0,
    activeUsers: 0
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
      
      // Calcular estatísticas
      const totalVotes = pollsResponse.data.reduce((sum, poll) => {
        return sum + (poll.options?.reduce((optSum, opt) => optSum + opt.votes, 0) || 0);
      }, 0);
      
      setStats({
        totalEvents: eventsResponse.data.length,
        totalPolls: pollsResponse.data.length,
        totalParticipations: totalVotes,
        activeUsers: Math.floor(totalVotes * 0.7) // Estimativa
      });
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-900 border-r-orange-500 mx-auto mb-4"></div>
          <p className="text-blue-700 font-semibold text-lg">Carregando dashboard administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/20 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-300/15 to-blue-300/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-orange-300/15 to-yellow-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-white via-purple-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-purple-900 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold group">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Dashboard Administrativo</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Gerenciar Eventos</a>
              <a href="/admin/polls" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Gerenciar Enquetes</a>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent mb-4">
            Painel Administrativo 👨‍💼
          </h1>
          <p className="text-blue-700 text-xl font-medium">
            Gerencie eventos, enquetes e monitore a atividade da comunidade UNASP EC
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-xl p-6 border border-blue-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total de Eventos</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">{stats.totalEvents}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Calendar className="w-10 h-10 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-xl p-6 border border-orange-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium">Total de Enquetes</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{stats.totalPolls}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <BarChart3 className="w-10 h-10 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-3xl shadow-xl p-6 border border-yellow-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-medium">Participações</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.totalParticipations}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <TrendingUp className="w-10 h-10 text-yellow-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-xl p-6 border border-green-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium">Usuários Ativos</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">{stats.activeUsers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 via-green-200 to-teal-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Users className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              ⚡ Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg">
                <Plus className="w-8 h-8 text-blue-900 mb-2" />
                <span className="text-sm font-bold text-blue-900">Criar Evento</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl hover:from-orange-200 hover:to-orange-300 transition-all shadow-md hover:shadow-lg">
                <BarChart3 className="w-8 h-8 text-orange-700 mb-2" />
                <span className="text-sm font-bold text-orange-700">Nova Enquete</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl hover:from-yellow-200 hover:to-yellow-300 transition-all shadow-md hover:shadow-lg">
                <FileText className="w-8 h-8 text-yellow-700 mb-2" />
                <span className="text-sm font-bold text-yellow-700">Relatórios</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl hover:from-green-200 hover:to-green-300 transition-all shadow-md hover:shadow-lg">
                <Settings className="w-8 h-8 text-green-700 mb-2" />
                <span className="text-sm font-bold text-green-700">Configurações</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              📊 Atividade Recente
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
                <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">Novo evento criado</p>
                  <p className="text-xs text-blue-700">Palestra sobre Tecnologia - há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
                <div className="bg-orange-500 w-3 h-3 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">Enquete finalizada</p>
                  <p className="text-xs text-blue-700">45 participações - há 1 dia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
                <div className="bg-yellow-500 w-3 h-3 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">Relatório gerado</p>
                  <p className="text-xs text-blue-700">Estatísticas mensais - há 3 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events and Polls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Recent Events */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">📅 Eventos Recentes</h2>
              <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center">
                Ver todos <Eye className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="border-2 border-blue-100 rounded-xl p-4 hover:border-orange-300 transition-all">
                  <h3 className="font-bold text-blue-900 text-sm">{event.title}</h3>
                  <p className="text-blue-700 text-xs mb-2">{event.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Polls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">📊 Enquetes Recentes</h2>
              <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center">
                Ver todas <Eye className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {polls.slice(0, 3).map((poll) => (
                <div key={poll.id} className="border-2 border-orange-100 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <h3 className="font-bold text-blue-900 text-sm mb-2">{poll.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      poll.isActive ? 'text-green-700 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {poll.isActive ? 'Ativa' : 'Finalizada'}
                    </span>
                    <span className="text-xs text-blue-600">
                      {poll.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0} votos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;