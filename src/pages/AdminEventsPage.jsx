import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Edit3, Trash2, Eye, Save, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: '',
    organizer: '',
    isActive: true
  });

  const categories = [
    'Acadêmico',
    'Palestra',
    'Workshop',
    'Seminário',
    'Evento Social',
    'Esporte',
    'Cultural',
    'Religioso'
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingEvent) {
        // Editar evento existente
        const response = await eventsAPI.update(editingEvent.id, formData);
        const updatedEvents = events.map(event => 
          event.id === editingEvent.id ? response.data : event
        );
        setEvents(updatedEvents);
        setEditingEvent(null);
      } else {
        // Criar novo evento
        const response = await eventsAPI.create(formData);
        setEvents([response.data, ...events]);
        setShowCreateForm(false);
      }
      
      // Reset form
      setFormData({
        title: '', description: '', date: '', time: '', location: '', 
        category: '', capacity: '', organizer: '', isActive: true
      });
      
    } catch (err) {
      console.error('Erro ao salvar evento:', err);
      alert('Erro ao salvar evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({ ...event });
    setShowCreateForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await eventsAPI.delete(eventId);
        setEvents(events.filter(event => event.id !== eventId));
      } catch (err) {
        console.error('Erro ao excluir evento:', err);
        alert('Erro ao excluir evento. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingEvent(null);
    setFormData({
      title: '', description: '', date: '', time: '', location: '', 
      category: '', capacity: '', isActive: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-900 border-r-orange-500 mx-auto mb-4"></div>
          <p className="text-blue-700 font-semibold text-lg">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-slate-300/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-300/15 to-blue-100/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-white via-blue-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-blue-800 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/admin/dashboard" className="text-2xl font-bold group">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Gerenciar Eventos</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href="/admin/dashboard" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Dashboard</a>
              <a href="/admin/events" className="text-white bg-gradient-to-r from-blue-600 to-blue-700 font-medium px-3 py-2 rounded-lg shadow-md text-sm">Eventos</a>
              <a href="/admin/polls" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Enquetes</a>
              <a href="/admin/notices" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Avisos</a>
              <a href="/admin/users" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-slate-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Usuários</a>
              <a href="/admin/reports" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Relatórios</a>
              <a href="/admin/settings" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-slate-800 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Config</a>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Breadcrumb */}
        <AdminBreadcrumb 
          items={[
            { label: 'Eventos', href: null }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                📅 Gerenciar Eventos
              </h1>
              <p className="text-slate-700 text-lg">
                Crie, edite e gerencie todos os eventos da UNASP Engenheiro Coelho
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Evento
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-blue-200/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-6">
              {editingEvent ? '✏️ Editar Evento' : '➕ Criar Novo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Título do Evento</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Categoria</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Data</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Horário</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Local</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Capacidade</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    min="1"
                    placeholder="Ex: 100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Organizador</label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Ex: Coordenação de Engenharia"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                />
                <label className="ml-3 text-sm font-medium text-blue-900">Evento ativo (visível para estudantes)</label>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingEvent ? 'Salvar Alterações' : 'Criar Evento'}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-xl p-6 border border-blue-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-102">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-sm font-semibold rounded-full border border-orange-200/50">
                    {event.category}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-blue-700 text-sm mb-4 line-clamp-3">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                {event.capacity && (
                  <div className="flex items-center text-sm text-blue-600">
                    <Users className="w-4 h-4 mr-2" />
                    Até {event.capacity} pessoas
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200/30 flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  event.isActive 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                }`}>
                  {event.isActive ? '✅ Ativo' : '⏸️ Inativo'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-500 mb-6">Comece criando seu primeiro evento para a comunidade UNASP!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Criar Primeiro Evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;