import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Settings, Plus, FileText, Eye, Bell, AlertTriangle, CheckCircle, Clock, MessageSquare, Activity, Shield, Database, Download, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsAPI, pollsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    server: 'online',
    database: 'online',
    api: 'online'
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalPolls: 0,
    totalParticipations: 0,
    activeUsers: 0,
    totalNotices: 12,
    pendingApprovals: 3,
    systemAlerts: 1,
    monthlyGrowth: 15.2
  });

  useEffect(() => {
    fetchDashboardData();
    loadNotifications();
    loadRecentActivity();
    loadPendingTasks();
    checkSystemHealth();
  }, []);

  // Fechar notificações com Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showNotifications]);

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
      
      setStats(prev => ({
        ...prev,
        totalEvents: eventsResponse.data.length,
        totalPolls: pollsResponse.data.length,
        totalParticipations: totalVotes,
        activeUsers: Math.floor(totalVotes * 0.7) // Estimativa
      }));
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: 1,
        title: 'Novo evento pendente aprovação',
        message: 'Palestra sobre IA precisa de aprovação',
        type: 'warning',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        title: 'Sistema atualizado',
        message: 'Nova versão do sistema foi instalada com sucesso',
        type: 'success',
        date: new Date(Date.now() - 86400000),
        read: false
      },
      {
        id: 3,
        title: 'Backup realizado',
        message: 'Backup diário dos dados concluído',
        type: 'info',
        date: new Date(Date.now() - 172800000),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  };

  const loadRecentActivity = () => {
    const mockActivity = [
      { id: 1, action: 'Evento criado', details: 'Palestra sobre Tecnologia', user: 'Admin', time: '2 horas' },
      { id: 2, action: 'Enquete finalizada', details: '45 participações', user: 'Sistema', time: '1 dia' },
      { id: 3, action: 'Usuário registrado', details: 'Nova conta de estudante', user: 'Sistema', time: '2 dias' },
      { id: 4, action: 'Relatório gerado', details: 'Estatísticas mensais', user: 'Admin', time: '3 dias' }
    ];
    setRecentActivity(mockActivity);
  };

  const loadPendingTasks = () => {
    const mockTasks = [
      { id: 1, task: 'Aprovar 3 eventos pendentes', priority: 'high', deadline: 'Hoje' },
      { id: 2, task: 'Revisar relatório mensal', priority: 'medium', deadline: 'Amanhã' },
      { id: 3, task: 'Atualizar configurações', priority: 'low', deadline: '3 dias' }
    ];
    setPendingTasks(mockTasks);
  };

  const checkSystemHealth = () => {
    // Simulação de verificação de saúde do sistema
    setSystemHealth({
      server: Math.random() > 0.1 ? 'online' : 'offline',
      database: Math.random() > 0.05 ? 'online' : 'warning',
      api: Math.random() > 0.08 ? 'online' : 'offline'
    });
  };

  const handleMarkTaskComplete = (taskId) => {
    setPendingTasks(tasks => tasks.filter(task => task.id !== taskId));
  };

  const handleExportData = () => {
    // Simulação de exportação de dados
    const data = {
      events: events,
      polls: polls,
      stats: stats,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nocampus-admin-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSearch = (searchTerm, type) => {
    // Função de busca - em produção integraria com API
    console.log(`Buscando por "${searchTerm}" em ${type}`);
  };

  const handleAdvancedFilters = () => {
    // Abrir modal de filtros avançados
    alert('Filtros avançados - Em desenvolvimento');
  };

  const handleShowMoreActivity = () => {
    // Navegar para página completa de atividades
    console.log('Mostrando mais atividades');
  };

  const handleDatabaseAction = (action) => {
    // Ações de banco de dados
    switch (action) {
      case 'backup':
        alert('Backup iniciado com sucesso!');
        break;
      case 'cache':
        alert('Cache limpo com sucesso!');
        break;
      case 'optimize':
        alert('Otimização do banco de dados concluída!');
        break;
      default:
        console.log('Ação não reconhecida');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-blue-100/20 relative overflow-hidden">
      {/* Subtle Background decorative elements - maintaining original style */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-blue-300/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-300/10 to-blue-100/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/8 to-blue-300/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-white via-blue-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-blue-800 relative z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold group">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Dashboard Administrativo</span>
            </div>
            <div className="flex items-center space-x-2 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-blue-900 hover:bg-blue-100 rounded-lg transition-colors z-50"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-[60]">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <Link to="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Eventos</Link>
              <Link to="/admin/polls" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Enquetes</Link>
              <Link to="/admin/notices" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Avisos</Link>
              <Link to="/admin/users" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-slate-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Usuários</Link>
              <Link to="/admin/reports" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Relatórios</Link>
              <Link to="/admin/settings" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-slate-800 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Config</Link>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
        
      {/* Notifications Dropdown - Portal style */}
      {showNotifications && (
        <div className="fixed inset-0 z-[99999]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-0"
            onClick={() => setShowNotifications(false)}
          ></div>
          
          {/* Notification panel positioned relative to the bell button */}
          <div 
            className="absolute top-20 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 transform-none"
            style={{ 
              maxWidth: 'calc(100vw - 3rem)',
              right: 'max(1.5rem, calc(100% - 20rem - 1.5rem))'
            }}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Notificações</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                  title="Fechar notificações"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{notification.date.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-sm">Nenhuma notificação no momento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-4">
            Painel Administrativo 👨‍💼
          </h1>
          <p className="text-slate-700 text-xl font-medium">
            Gerencie eventos, enquetes e monitore a atividade da comunidade UNASP EC
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white/90 to-blue-50/60 rounded-3xl shadow-xl p-6 border border-blue-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total de Eventos</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">{stats.totalEvents}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% este mês</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Calendar className="w-10 h-10 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-blue-50/60 rounded-3xl shadow-xl p-6 border border-blue-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total de Enquetes</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{stats.totalPolls}</p>
                <p className="text-xs text-green-600 mt-1">↗ +8% este mês</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-slate-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <BarChart3 className="w-10 h-10 text-blue-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-gray-50/60 rounded-3xl shadow-xl p-6 border border-gray-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Participações</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-blue-700 bg-clip-text text-transparent">{stats.totalParticipations}</p>
                <p className="text-xs text-green-600 mt-1">↗ +{stats.monthlyGrowth}% este mês</p>
              </div>
              <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <TrendingUp className="w-10 h-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-blue-50/60 rounded-3xl shadow-xl p-6 border border-blue-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Usuários Ativos</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">{stats.activeUsers}</p>
                <p className="text-xs text-green-600 mt-1">↗ +5% esta semana</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Users className="w-10 h-10 text-blue-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row - Maintaining Blue Palette */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white/90 to-blue-50/60 rounded-3xl shadow-xl p-6 border border-blue-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Avisos Publicados</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{stats.totalNotices}</p>
                <p className="text-xs text-blue-600 mt-1">Este mês</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <MessageSquare className="w-10 h-10 text-blue-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-slate-50/60 rounded-3xl shadow-xl p-6 border border-slate-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm font-medium">Pendências</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">{stats.pendingApprovals}</p>
                <p className="text-xs text-blue-600 mt-1">Requer atenção</p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <AlertTriangle className="w-10 h-10 text-slate-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-indigo-50/60 rounded-3xl shadow-xl p-6 border border-indigo-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-700 text-sm font-medium">Alertas Sistema</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-800 bg-clip-text text-transparent">{stats.systemAlerts}</p>
                <p className="text-xs text-slate-600 mt-1">Verificar logs</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-100 via-indigo-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Shield className="w-10 h-10 text-indigo-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-cyan-50/60 rounded-3xl shadow-xl p-6 border border-cyan-200/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-700 text-sm font-medium">Sistema Saudável</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">99.8%</p>
                <p className="text-xs text-cyan-600 mt-1">Uptime mensal</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                <Activity className="w-10 h-10 text-cyan-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* System Health Monitor */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-900 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
            🔧 Status do Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
              <div className={`w-4 h-4 rounded-full ${systemHealth.server === 'online' ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
              <div>
                <p className="font-semibold text-blue-900">Servidor</p>
                <p className="text-sm text-slate-600 capitalize">{systemHealth.server}</p>
              </div>
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
              <div className={`w-4 h-4 rounded-full ${systemHealth.database === 'online' ? 'bg-blue-500' : systemHealth.database === 'warning' ? 'bg-indigo-500' : 'bg-slate-500'}`}></div>
              <div>
                <p className="font-semibold text-blue-900">Banco de Dados</p>
                <p className="text-sm text-slate-600 capitalize">{systemHealth.database}</p>
              </div>
              <Database className="w-6 h-6 text-slate-600" />
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
              <div className={`w-4 h-4 rounded-full ${systemHealth.api === 'online' ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
              <div>
                <p className="font-semibold text-blue-900">API</p>
                <p className="text-sm text-slate-600 capitalize">{systemHealth.api}</p>
              </div>
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-600 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
            ⏰ Tarefas Pendentes
          </h2>
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-200/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-blue-800' :
                    task.priority === 'medium' ? 'bg-blue-600' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-blue-900 text-sm">{task.task}</p>
                    <p className="text-xs text-slate-600">Prazo: {task.deadline}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleMarkTaskComplete(task.id)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Marcar como concluída"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enhanced Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-900">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
              ⚡ Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/admin/events" className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group">
                <Plus className="w-8 h-8 text-blue-900 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-blue-900">Criar Evento</span>
              </Link>
              <Link to="/admin/polls" className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-slate-200 rounded-xl hover:from-blue-200 hover:to-slate-300 transition-all shadow-md hover:shadow-lg group">
                <BarChart3 className="w-8 h-8 text-blue-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-blue-700">Nova Enquete</span>
              </Link>
              <Link to="/admin/notices" className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-xl hover:from-indigo-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group">
                <MessageSquare className="w-8 h-8 text-indigo-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-indigo-700">Novo Aviso</span>
              </Link>
              <Link to="/admin/users" className="flex flex-col items-center p-4 bg-gradient-to-br from-slate-100 to-blue-200 rounded-xl hover:from-slate-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group">
                <Users className="w-8 h-8 text-slate-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-slate-700">Gerenciar Usuários</span>
              </Link>
              <Link to="/admin/reports" className="flex flex-col items-center p-4 bg-gradient-to-br from-slate-100 to-blue-200 rounded-xl hover:from-slate-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group">
                <FileText className="w-8 h-8 text-slate-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-slate-700">Relatórios</span>
              </Link>
              <Link to="/admin/settings" className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:from-blue-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group">
                <Settings className="w-8 h-8 text-blue-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-blue-700">Configurações</span>
              </Link>
              <button 
                onClick={handleExportData}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl hover:from-cyan-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group"
                title="Exportar dados do sistema"
              >
                <Download className="w-8 h-8 text-cyan-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-cyan-700">Exportar Dados</span>
              </button>
              <button 
                onClick={checkSystemHealth}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-xl hover:from-indigo-200 hover:to-blue-300 transition-all shadow-md hover:shadow-lg group"
              >
                <Activity className="w-8 h-8 text-indigo-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-indigo-700">Verificar Sistema</span>
              </button>
            </div>
          </div>

          {/* Enhanced Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center">
                📊 Atividade Recente
              </h2>
              <button 
                onClick={() => handleSearch('', 'activity')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Buscar nas atividades"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50/50 to-gray-50/50 rounded-lg hover:from-blue-100/50 hover:to-gray-100/50 transition-all">
                  <div className="bg-blue-600 w-3 h-3 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-blue-900">{activity.action}</p>
                      <span className="text-xs text-gray-500">há {activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-600">{activity.details}</p>
                    <p className="text-xs text-blue-600">por {activity.user}</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={handleShowMoreActivity}
                className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2 hover:bg-blue-50/50 rounded-lg transition-colors"
              >
                Ver mais atividades
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-slate-500 mt-8 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
            🔍 Busca Rápida e Filtros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-200/50">
              <Search className="w-5 h-5 text-blue-600" />
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value, 'events')}
              />
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/50">
              <Search className="w-5 h-5 text-slate-600" />
              <input 
                type="text" 
                placeholder="Buscar enquetes..." 
                className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value, 'polls')}
              />
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200/50">
              <Search className="w-5 h-5 text-indigo-600" />
              <input 
                type="text" 
                placeholder="Buscar usuários..." 
                className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value, 'users')}
              />
            </div>
            <button 
              onClick={handleAdvancedFilters}
              className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Filtros Avançados</span>
            </button>
          </div>
        </div>

        {/* Recent Events and Polls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Enhanced Recent Events */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">📅 Eventos Recentes</h2>
              <Link to="/admin/events" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center transition-colors">
                Ver todos <Eye className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="border-2 border-blue-100/60 rounded-xl p-4 hover:border-blue-300/80 transition-all hover:shadow-md bg-gradient-to-r from-white/80 to-blue-50/40">
                  <h3 className="font-bold text-blue-900 text-sm">{event.title}</h3>
                  <p className="text-gray-600 text-xs mb-2">{event.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 bg-blue-100/70 px-2 py-1 rounded-full">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-xs text-gray-600 bg-gray-100/70 px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum evento encontrado</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Recent Polls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-slate-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">📊 Enquetes Recentes</h2>
              <Link to="/admin/polls" className="text-gray-600 hover:text-gray-700 font-semibold text-sm flex items-center transition-colors">
                Ver todas <Eye className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {polls.slice(0, 3).map((poll) => (
                <div key={poll.id} className="border-2 border-gray-100/60 rounded-xl p-4 hover:border-gray-300/80 transition-all hover:shadow-md bg-gradient-to-r from-white/80 to-gray-50/40">
                  <h3 className="font-bold text-blue-900 text-sm mb-2">{poll.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      poll.isActive ? 'text-green-700 bg-green-100/70' : 'text-gray-600 bg-gray-100/70'
                    }`}>
                      {poll.isActive ? 'Ativa' : 'Finalizada'}
                    </span>
                    <span className="text-xs text-blue-600 bg-blue-50/70 px-2 py-1 rounded-full">
                      {poll.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0} votos
                    </span>
                  </div>
                </div>
              ))}
              {polls.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma enquete encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advanced Admin Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Database Management */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-600">
            <h2 className="text-lg font-bold text-indigo-800 mb-4 flex items-center">
              🗄️ Gestão de Dados
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => handleDatabaseAction('backup')}
                className="w-full text-left p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all border border-indigo-200/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-800">Backup Automático</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-600 mt-1">Último: hoje às 03:00</p>
              </button>
              <button 
                onClick={() => handleDatabaseAction('cache')}
                className="w-full text-left p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all border border-indigo-200/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-800">Limpeza de Cache</span>
                  <Clock className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-xs text-slate-600 mt-1">Executar limpeza</p>
              </button>
              <button 
                onClick={() => handleDatabaseAction('optimize')}
                className="w-full text-left p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all border border-indigo-200/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-800">Otimização DB</span>
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-slate-600 mt-1">Performance: Ótima</p>
              </button>
            </div>
          </div>

          {/* Security Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-slate-600">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              🔐 Segurança
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">Tentativas de Login</span>
                  <span className="text-xs text-blue-600 bg-blue-100/70 px-2 py-1 rounded-full">Normais</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">3 falhas nas últimas 24h</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">SSL/TLS</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-600 mt-1">Certificado válido</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">Firewall</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-xs text-slate-600 mt-1">Proteção ativa</p>
              </div>
            </div>
          </div>

          {/* Analytics Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-cyan-600">
            <h2 className="text-lg font-bold text-cyan-800 mb-4 flex items-center">
              📈 Resumo Analítico
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cyan-800">Engajamento</span>
                  <span className="text-xs text-cyan-600">↗ +12%</span>
                </div>
                <div className="w-full bg-cyan-100 rounded-full h-2 mt-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cyan-800">Satisfação</span>
                  <span className="text-xs text-cyan-600">4.8/5.0</span>
                </div>
                <div className="w-full bg-cyan-100 rounded-full h-2 mt-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-cyan-800">Atividade</span>
                  <span className="text-xs text-cyan-600">↗ +8%</span>
                </div>
                <div className="w-full bg-cyan-100 rounded-full h-2 mt-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Dashboard Administrativo NoCampus • Versão 2.1.0 • Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;