import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus, Search, Filter, Users, ChevronDown, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedCategory]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
      setError('Erro ao carregar eventos. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  };

  const categories = ['all', 'Acadêmico', 'Cultural', 'Esportivo', 'Espiritual', 'Social'];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Acadêmico': return 'bg-blue-500';
      case 'Cultural': return 'bg-purple-500';
      case 'Esportivo': return 'bg-green-500';
      case 'Espiritual': return 'bg-yellow-500';
      case 'Social': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleRSVP = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, rsvp: !event.rsvp }
        : event
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Eventos do UNASP EC</h1>
          <p className="text-gray-600 mt-2">Descubra e participe dos eventos da nossa comunidade universitária</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => alert('Funcionalidade em desenvolvimento: Em breve você poderá sugerir eventos!')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Sugerir Evento
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>{selectedCategory === 'all' ? 'Todas as categorias' : selectedCategory}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      selectedCategory === category ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {category === 'all' ? 'Todas as categorias' : category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Category Bar */}
              <div className={`h-2 ${getCategoryColor(event.category)}`}></div>
              
              <div className="p-6">
                {/* Event Header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  {event.category && (
                    <span className={`text-xs px-2 py-1 rounded-full text-white ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  )}
                </div>

                {/* Event Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  {event.location && (
                    <div className="flex items-center">
                      <button 
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                        onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(event.location)}`, '_blank')}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 line-clamp-3">{event.description}</p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    onClick={() => handleRSVP(event.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {event.rsvp ? 'Confirmado ✓' : 'Participar'}
                  </button>
                  <button
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                    onClick={() => {
                      const eventDate = event.date.replace(/-/g, '');
                      const eventTime = event.time ? event.time.replace(':', '') + '00' : '120000';
                      const endTime = event.time ? 
                        (parseInt(event.time.split(':')[0]) + 2).toString().padStart(2, '0') + 
                        event.time.split(':')[1] + '00' : '140000';
                      
                      window.open(
                        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate}T${eventTime}/${eventDate}T${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}`, 
                        '_blank'
                      );
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Adicionar à Agenda
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'Nenhum evento encontrado' : 'Nenhum evento disponível'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Novos eventos serão publicados em breve.'
            }
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {filteredEvents.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{filteredEvents.length}</div>
              <div className="text-blue-100">Eventos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {new Set(filteredEvents.map(e => e.category)).size}
              </div>
              <div className="text-blue-100">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {filteredEvents.filter(e => new Date(e.date) >= new Date()).length}
              </div>
              <div className="text-blue-100">Próximos Eventos</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;