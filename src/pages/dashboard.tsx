import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Calendar from '@/components/Calendar';
import PollsSection from '@/components/PollsSection';
import StatsWidget from '@/components/StatsWidget';
import Avatar from '@/components/Avatar';

const Dashboard: NextPage = () => {
  const [user] = useState({
    name: 'Ana Julia',
    email: 'joao.silva@eaportal.unasp.org',
    role: 'student'
  });

  const [events] = useState([
    {
      id: 1,
      title: 'Palestra sobre IA',
      date: new Date(2025, 8, 25), // 25 de setembro
      time: '19:00',
      location: 'Auditório Principal',
      category: 'Tecnologia'
    },
    {
      id: 2,
      title: 'Workshop de Design',
      date: new Date(2025, 8, 28), // 28 de setembro
      time: '14:00',
      location: 'Lab de Design',
      category: 'Design'
    },
    {
      id: 3,
      title: 'Feira de Profissões',
      date: new Date(2025, 8, 30), // 30 de setembro
      time: '08:00',
      location: 'Pátio Central',
      category: 'Carreira'
    }
  ]);

  const [activePolls] = useState([
    {
      id: '1',
      title: 'Melhor horário para palestra de IA',
      description: 'Ajude-nos a escolher o melhor horário',
      endDate: new Date(2025, 8, 24),
      options: [
        { id: '1', text: '14:00 - 15:30', votes: 12 },
        { id: '2', text: '19:00 - 20:30', votes: 25 },
        { id: '3', text: '20:00 - 21:30', votes: 8 }
      ],
      userVoted: false
    },
    {
      id: '2',
      title: 'Local para Workshop de Design',
      description: 'Onde seria melhor realizar o workshop?',
      endDate: new Date(2025, 8, 26),
      options: [
        { id: '1', text: 'Lab de Informática', votes: 18 },
        { id: '2', text: 'Auditório', votes: 7 },
        { id: '3', text: 'Sala de Reuniões', votes: 15 }
      ],
      userVoted: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
                <span className="text-sm text-gray-600 ml-2">UNASP</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {user.name}</span>
              <div className="flex items-center space-x-2">
                <Link href="/events" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                  Eventos
                </Link>
                <Link href="/polls" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                  Enquetes
                </Link>
                <Link href="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                  <Avatar src="" name={user.name} size="sm" />
                  <span>Perfil</span>
                </Link>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user.name}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades e eventos próximos na UNASP.
          </p>
        </div>

        {/* Stats Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsWidget
            title="Eventos este mês"
            value="8"
            icon="📅"
            color="bg-primary"
            change="+2 desde o mês passado"
          />
          <StatsWidget
            title="Enquetes ativas"
            value="5"
            icon="🗳️"
            color="bg-secondary"
            change="2 precisam do seu voto"
          />
          <StatsWidget
            title="Eventos participados"
            value="12"
            icon="✅"
            color="bg-accent"
            change="+3 este mês"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Calendário de Eventos
              </h3>
              <Calendar events={events} />
            </div>
          </div>

          {/* Polls Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enquetes Ativas
              </h3>
              <PollsSection polls={activePolls} />
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Próximos Eventos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className={`h-1 rounded-t-lg mb-3 ${
                  index % 3 === 0 ? 'bg-primary' : 
                  index % 3 === 1 ? 'bg-secondary' : 'bg-accent'
                }`}></div>
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center">
                    <span className="mr-2">📅</span>
                    {event.date.toLocaleDateString('pt-BR')}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">🕐</span>
                    {event.time}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    event.category === 'Tecnologia' ? 'bg-primary-light bg-opacity-20 text-primary' :
                    event.category === 'Design' ? 'bg-secondary-light bg-opacity-20 text-secondary' :
                    'bg-accent-light bg-opacity-20 text-accent'
                  }`}>
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;