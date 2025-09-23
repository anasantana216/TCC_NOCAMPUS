import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const Home: NextPage = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Palestra sobre Tecnologia',
      date: '25 de Setembro, 2025',
      location: 'Auditório Principal',
      description: 'Uma palestra inspiradora sobre as últimas tendências em tecnologia.',
      time: '19:00'
    },
    {
      id: 2,
      title: 'Workshop de Design',
      date: '28 de Setembro, 2025',
      location: 'Lab de Design',
      description: 'Aprenda técnicas modernas de design digital.',
      time: '14:00'
    },
    {
      id: 3,
      title: 'Feira de Profissões',
      date: '30 de Setembro, 2025',
      location: 'Pátio Central',
      description: 'Conheça diversas oportunidades de carreira.',
      time: '08:00'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
            </h1>
            <nav className="space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Dashboard
              </Link>
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Bem-vindo ao <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
          </h2>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Sua plataforma central para descobrir e participar de eventos, palestras e atividades no campus.
          </p>
          <p className="text-lg text-primary font-semibold mb-8">
            Centro Universitário Adventista de São Paulo - UNASP
          </p>
          <div className="space-x-4">
            <Link href="/login" className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-primary-dark transition-colors inline-block">
              Fazer Login
            </Link>
            <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg text-lg hover:bg-secondary hover:text-white transition-colors">
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Próximos Eventos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 ${index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'}`}></div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p className="flex items-center">
                      <span className="mr-2">📅</span>
                      {event.date}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">🕐</span>
                      {event.time}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <button className={`w-full text-white py-2 rounded-lg transition-colors ${
                    index % 3 === 0 ? 'bg-primary hover:bg-primary-dark' : 
                    index % 3 === 1 ? 'bg-secondary hover:bg-secondary-dark' : 
                    'bg-accent hover:bg-accent-dark'
                  }`}>
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Por que usar o <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-light bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Eventos Personalizados</h4>
              <p className="text-gray-600">Descubra eventos que combinam com seus interesses e área de estudo.</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-light bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Notificações</h4>
              <p className="text-gray-600">Receba lembretes sobre eventos que você não pode perder.</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-light bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Comunidade</h4>
              <p className="text-gray-600">Conecte-se com outros estudantes e participe de discussões.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-dark to-secondary-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">
            <span className="text-white">No</span><span className="text-yellow-400">Campus</span>
          </h4>
          <p className="text-gray-200 mb-2">Conectando estudantes através de eventos e experiências.</p>
          <p className="text-yellow-300 font-medium mb-4">
            Centro Universitário Adventista de São Paulo - UNASP
          </p>
          <p className="text-gray-300 text-sm">© 2025 NoCampus UNASP. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
