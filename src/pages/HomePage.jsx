import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Target, Bell, ArrowRight } from 'lucide-react';
import { eventsAPI, pollsAPI } from '../services/api';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, pollsResponse] = await Promise.all([
        eventsAPI.getAll(),
        pollsAPI.getAll()
      ]);
      
      setEvents(eventsResponse.data.slice(0, 3)); // Primeiros 3 eventos
      setPolls(pollsResponse.data.slice(0, 1)); // Primeira enquete
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Bem-vindo ao <span className="text-blue-600">No</span><span className="text-yellow-500">Campus</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Sua plataforma central para descobrir eventos, participar de enquetes e conectar-se com a comunidade universitária do UNASP.
        </p>
        <p className="text-lg text-blue-600 font-semibold mb-8">
          Centro Universitário Adventista de São Paulo - UNASP
        </p>
        <div className="mb-8">
          <Link
            to="/about"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Saiba Mais
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-600 mb-4">Faça login para acessar recursos completos:</p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 inline-flex items-center shadow-lg"
          >
            Fazer Login
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Próximos Eventos</h2>
          <Link to="/events" className="text-blue-600 hover:text-blue-700 font-medium">
            Ver todos os eventos →
          </Link>
        </div>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 ${index % 3 === 0 ? 'bg-blue-600' : index % 3 === 1 ? 'bg-green-600' : 'bg-purple-600'}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                    {event.category && (
                      <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {event.category}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <button className={`w-full text-white py-2 rounded-lg transition-colors ${
                    index % 3 === 0 ? 'bg-blue-600 hover:bg-blue-700' : 
                    index % 3 === 1 ? 'bg-green-600 hover:bg-green-700' : 
                    'bg-purple-600 hover:bg-purple-700'
                  }`}>
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-500">Novos eventos serão publicados em breve.</p>
          </div>
        )}
      </section>

      {/* Active Poll Section */}
      {polls.length > 0 && (
        <section className="py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Enquete em Destaque</h2>
              <Link to="/polls" className="text-blue-600 hover:text-blue-700 font-medium">
                Ver todas as enquetes →
              </Link>
            </div>
            
            {polls.map((poll) => (
              <div key={poll.id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{poll.title}</h3>
                {poll.description && (
                  <p className="text-gray-600 mb-4">{poll.description}</p>
                )}
                
                <div className="space-y-3">
                  {poll.options?.slice(0, 3).map((option) => {
                    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                    
                    return (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{option.text}</span>
                            <span className="text-sm text-gray-500">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6">
                  <Link
                    to="/polls"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                  >
                    Participar da Enquete
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Por que usar o <span className="text-blue-600">No</span><span className="text-yellow-500">Campus</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Eventos Personalizados</h3>
            <p className="text-gray-600">Descubra eventos que combinam com seus interesses e área de estudo no UNASP.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Participação Ativa</h3>
            <p className="text-gray-600">Participe de enquetes e contribua para as decisões da comunidade universitária.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Comunidade</h3>
            <p className="text-gray-600">Conecte-se com outros estudantes e construa relacionamentos duradouros.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;