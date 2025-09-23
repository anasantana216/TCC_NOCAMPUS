import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const [admin] = useState({
    name: 'Administrador',
    email: 'admin.admin.unasp.org',
    role: 'admin'
  });

  const [stats] = useState({
    totalUsers: 1247,
    activePolls: 8,
    totalEvents: 156,
    monthlyParticipation: 89
  });

  const [recentPolls] = useState([
    {
      id: '1',
      title: 'Horário da Palestra de IA',
      description: 'Escolha o melhor horário',
      totalVotes: 45,
      endDate: new Date(2025, 8, 24),
      status: 'active',
      options: [
        { id: '1', text: '14:00 - 15:30', votes: 12 },
        { id: '2', text: '19:00 - 20:30', votes: 25 },
        { id: '3', text: '20:00 - 21:30', votes: 8 }
      ]
    },
    {
      id: '2',
      title: 'Local para Workshop de Design',
      description: 'Onde realizar o workshop?',
      totalVotes: 32,
      endDate: new Date(2025, 8, 26),
      status: 'active',
      options: [
        { id: '1', text: 'Lab de Informática', votes: 18 },
        { id: '2', text: 'Auditório', votes: 7 },
        { id: '3', text: 'Sala de Reuniões', votes: 15 }
      ]
    },
    {
      id: '3',
      title: 'Tema da Semana Acadêmica',
      description: 'Qual tema prefere?',
      totalVotes: 78,
      endDate: new Date(2025, 8, 20),
      status: 'finished',
      options: [
        { id: '1', text: 'Inovação e Tecnologia', votes: 45 },
        { id: '2', text: 'Sustentabilidade', votes: 20 },
        { id: '3', text: 'Empreendedorismo', votes: 13 }
      ]
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Palestra sobre Inteligência Artificial',
      date: new Date(2025, 8, 25),
      time: '19:00',
      location: 'Auditório Principal',
      participants: 156,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Workshop de Design Thinking',
      date: new Date(2025, 8, 28),
      time: '14:00',
      location: 'Lab de Design',
      participants: 45,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Feira de Profissões',
      date: new Date(2025, 8, 30),
      time: '08:00',
      location: 'Pátio Central',
      participants: 89,
      status: 'confirmed'
    }
  ]);

  const deletePoll = (pollId: string) => {
    if (confirm('Tem certeza que deseja excluir esta enquete?')) {
      // Aqui seria feita a chamada à API para deletar
      alert(`Enquete ${pollId} excluída com sucesso!`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'finished': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'finished': return 'Finalizada';
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Header */}
      <header className="bg-slate-900 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                No<span className="text-blue-400">Campus</span>
                <span className="ml-2 text-sm bg-blue-600 text-white px-2 py-1 rounded-full">Admin</span>
                <span className="text-sm text-slate-300 ml-2">UNASP</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <span className="text-slate-300">Olá, {admin.name}</span>
              <div className="flex items-center space-x-2">
                <Link href="/admin/polls" className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  Enquetes
                </Link>
                <Link href="/admin/events" className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  Eventos
                </Link>
                <Link href="/admin/users" className="text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                  Usuários
                </Link>
                <button 
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sair
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Painel Administrativo 📊
          </h2>
          <p className="text-slate-600">
            Gerencie enquetes, eventos e monitore atividades da plataforma UNASP.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-l-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total de Usuários</p>
                <p className="text-3xl font-bold text-slate-800">{stats.totalUsers}</p>
                <p className="text-sm text-blue-600">+12% este mês</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-l-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Enquetes Ativas</p>
                <p className="text-3xl font-bold text-slate-800">{stats.activePolls}</p>
                <p className="text-sm text-indigo-600">3 finalizando hoje</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🗳️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-l-sky-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total de Eventos</p>
                <p className="text-3xl font-bold text-slate-800">{stats.totalEvents}</p>
                <p className="text-sm text-sky-600">8 este mês</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-l-cyan-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Participação (%)</p>
                <p className="text-3xl font-bold text-slate-800">{stats.monthlyParticipation}%</p>
                <p className="text-sm text-cyan-600">+5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Polls Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Gerenciar Enquetes</h3>
              <Link 
                href="/admin/create-poll"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Enquete
              </Link>
            </div>

            <div className="space-y-4">
              {recentPolls.map((poll) => (
                <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{poll.title}</h4>
                      <p className="text-sm text-slate-600">{poll.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poll.status)}`}>
                        {getStatusText(poll.status)}
                      </span>
                      <button
                        onClick={() => deletePoll(poll.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {poll.options.map((option) => {
                      const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                      return (
                        <div key={option.id} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{option.text}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-slate-600 w-12 text-right">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                    <span>Total: {poll.totalVotes} votos</span>
                    <span>Termina: {poll.endDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link href="/admin/poll-results" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Ver todos os resultados →
              </Link>
            </div>
          </div>

          {/* Events Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Próximos Eventos</h3>
              <Link 
                href="/admin/create-event"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Novo Evento
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800">{event.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-slate-600 mb-3">
                    <p className="flex items-center">
                      <span className="mr-2">📅</span>
                      {event.date.toLocaleDateString('pt-BR')} às {event.time}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">👥</span>
                      {event.participants} participantes
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Editar
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link href="/admin/events" className="text-blue-600 hover:text-blue-700 font-medium">
                Ver todos os eventos →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/admin/create-poll"
              className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center"
            >
              <div className="text-2xl mb-2">🗳️</div>
              <div className="font-medium text-slate-800">Criar Enquete</div>
              <div className="text-sm text-slate-600">Nova enquete para evento</div>
            </Link>

            <Link 
              href="/admin/create-event"
              className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-center"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium text-slate-800">Criar Evento</div>
              <div className="text-sm text-slate-600">Novo evento no campus</div>
            </Link>

            <Link 
              href="/admin/users"
              className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-sky-600 hover:bg-sky-50 transition-all text-center"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-slate-800">Gerenciar Usuários</div>
              <div className="text-sm text-slate-600">Ver lista de usuários</div>
            </Link>

            <Link 
              href="/admin/reports"
              className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-cyan-600 hover:bg-cyan-50 transition-all text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-slate-800">Relatórios</div>
              <div className="text-sm text-slate-600">Análises e métricas</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;