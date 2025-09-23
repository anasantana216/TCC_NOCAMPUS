import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface EventType {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  maxParticipants?: number;
  createdBy: string;
}

const Events: NextPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [events] = useState<EventType[]>([
    {
      id: 1,
      title: 'Palestra sobre Inteligência Artificial',
      date: new Date(2025, 8, 25),
      time: '19:00',
      location: 'Auditório Principal',
      description: 'Uma palestra inspiradora sobre as últimas tendências em IA e seu impacto no mercado de trabalho.',
      category: 'Tecnologia',
      status: 'upcoming',
      participants: 156,
      maxParticipants: 200,
      createdBy: 'Prof. Ana Silva'
    },
    {
      id: 2,
      title: 'Workshop de Design Thinking',
      date: new Date(2025, 8, 28),
      time: '14:00',
      location: 'Lab de Design',
      description: 'Aprenda metodologias ágeis de design e desenvolva soluções criativas.',
      category: 'Design',
      status: 'upcoming',
      participants: 45,
      maxParticipants: 60,
      createdBy: 'Prof. Carlos Lima'
    },
    {
      id: 3,
      title: 'Feira de Profissões 2025',
      date: new Date(2025, 8, 30),
      time: '08:00',
      location: 'Pátio Central',
      description: 'Conheça diversas oportunidades de carreira e faça networking com profissionais.',
      category: 'Carreira',
      status: 'upcoming',
      participants: 89,
      createdBy: 'Coordenação Acadêmica'
    },
    {
      id: 4,
      title: 'Semana da Computação',
      date: new Date(2025, 8, 15),
      time: '08:00',
      location: 'Campus UNASP',
      description: 'Uma semana inteira dedicada à tecnologia, programação e inovação.',
      category: 'Tecnologia',
      status: 'completed',
      participants: 234,
      maxParticipants: 250,
      createdBy: 'Depto. Ciência da Computação'
    },
    {
      id: 5,
      title: 'Torneio de Futsal Universitário',
      date: new Date(2025, 8, 10),
      time: '16:00',
      location: 'Quadra Poliesportiva',
      description: 'Competição entre os cursos da UNASP com premiação aos vencedores.',
      category: 'Esportes',
      status: 'completed',
      participants: 120,
      createdBy: 'Atlética UNASP'
    },
    {
      id: 6,
      title: 'Conferência de Sustentabilidade',
      date: new Date(2025, 9, 5),
      time: '09:00',
      location: 'Auditório Central',
      description: 'Discussões sobre práticas sustentáveis e responsabilidade ambiental.',
      category: 'Meio Ambiente',
      status: 'upcoming',
      participants: 78,
      maxParticipants: 150,
      createdBy: 'Prof. Marina Santos'
    },
    {
      id: 7,
      title: 'Hackathon UNASP 2025',
      date: new Date(2025, 9, 12),
      time: '08:00',
      location: 'Lab de Informática',
      description: 'Maratona de programação de 48 horas com prêmios incríveis.',
      category: 'Tecnologia',
      status: 'upcoming',
      participants: 67,
      maxParticipants: 80,
      createdBy: 'IEEE UNASP'
    },
    {
      id: 8,
      title: 'Mostra Cultural Adventista',
      date: new Date(2025, 9, 20),
      time: '19:00',
      location: 'Teatro UNASP',
      description: 'Apresentações artísticas e culturais dos estudantes da UNASP.',
      category: 'Cultura',
      status: 'upcoming',
      participants: 145,
      maxParticipants: 300,
      createdBy: 'Depto. Cultural'
    },
    {
      id: 9,
      title: 'Simpósio de Pesquisa Científica',
      date: new Date(2025, 10, 8),
      time: '08:00',
      location: 'Centro de Convenções',
      description: 'Apresentação dos trabalhos de iniciação científica dos estudantes.',
      category: 'Acadêmico',
      status: 'upcoming',
      participants: 95,
      maxParticipants: 200,
      createdBy: 'Pró-Reitoria de Pesquisa'
    },
    {
      id: 10,
      title: 'Festival Gastronômico',
      date: new Date(2025, 10, 15),
      time: '18:00',
      location: 'Praça da Alimentação',
      description: 'Degustação de pratos típicos preparados pelos estudantes.',
      category: 'Gastronomia',
      status: 'upcoming',
      participants: 203,
      maxParticipants: 300,
      createdBy: 'Curso de Gastronomia'
    }
  ]);

  const categories = ['all', 'Tecnologia', 'Design', 'Carreira', 'Esportes', 'Meio Ambiente', 'Cultura', 'Acadêmico', 'Gastronomia'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed'];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const categoryMatch = filterCategory === 'all' || event.category === filterCategory;
      const statusMatch = filterStatus === 'all' || event.status === filterStatus;
      const monthMatch = event.date.getMonth() === selectedMonth;
      const yearMatch = event.date.getFullYear() === selectedYear;
      
      return categoryMatch && statusMatch && monthMatch && yearMatch;
    });
  }, [events, filterCategory, filterStatus, selectedMonth, selectedYear]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'Em Andamento';
      case 'completed': return 'Finalizado';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Tecnologia': 'bg-blue-500',
      'Design': 'bg-purple-500',
      'Carreira': 'bg-green-500',
      'Esportes': 'bg-red-500',
      'Meio Ambiente': 'bg-emerald-500',
      'Cultura': 'bg-pink-500',
      'Acadêmico': 'bg-indigo-500',
      'Gastronomia': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-primary hover:text-primary-dark mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
                <span className="text-sm text-gray-600 ml-2">UNASP</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Dashboard
              </Link>
              <Link href="/events" className="text-primary font-medium px-3 py-2 rounded-md">
                Eventos
              </Link>
              <Link href="/polls" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Enquetes
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Perfil
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Eventos da UNASP 📅
          </h2>
          <p className="text-gray-600">
            Explore todos os eventos, palestras e atividades do campus.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Month Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mês</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as Categorias' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Todos os Status' : 
                     status === 'upcoming' ? 'Próximos' :
                     status === 'ongoing' ? 'Em Andamento' : 'Finalizados'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Category Bar */}
              <div className={`h-3 ${getCategoryColor(event.category)}`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">
                    {event.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>
                </div>

                {/* Event Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">{event.createdBy}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4">
                  {event.description}
                </p>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>

                {/* Participants */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Participantes</span>
                    <span>
                      {event.participants}
                      {event.maxParticipants && ` / ${event.maxParticipants}`}
                    </span>
                  </div>
                  {event.maxParticipants && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button 
                  className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
                    event.status === 'upcoming' 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : event.status === 'ongoing'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={event.status === 'completed'}
                >
                  {event.status === 'upcoming' 
                    ? 'Participar' 
                    : event.status === 'ongoing'
                    ? 'Ver Detalhes'
                    : 'Evento Finalizado'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-gray-500">
              Não há eventos para os filtros selecionados.
              <br />
              Tente alterar o mês, ano ou categoria.
            </p>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo de {months[selectedMonth]} {selectedYear}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {filteredEvents.length}
              </div>
              <div className="text-sm text-gray-600">Eventos Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {filteredEvents.filter(e => e.status === 'upcoming').length}
              </div>
              <div className="text-sm text-gray-600">Próximos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {filteredEvents.filter(e => e.status === 'ongoing').length}
              </div>
              <div className="text-sm text-gray-600">Em Andamento</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">
                {filteredEvents.filter(e => e.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Finalizados</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;