import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Edit3, Trash2, Eye, EyeOff, Save, X, AlertCircle, Users, Calendar } from 'lucide-react';
import { pollsAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

const AdminPollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    options: ['', ''],
    isActive: true,
    allowMultiple: false,
    endDate: ''
  });

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const response = await pollsAPI.getAll();
      setPolls(response.data);
    } catch (err) {
      console.error('Erro ao carregar enquetes:', err);
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

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, options: newOptions }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pollData = {
        ...formData,
        options: formData.options.filter(opt => opt.trim() !== '').map(opt => ({
          text: opt,
          votes: 0
        }))
      };

      if (editingPoll) {
        // Simular edição
        const updatedPolls = polls.map(poll => 
          poll.id === editingPoll.id ? { ...pollData, id: editingPoll.id } : poll
        );
        setPolls(updatedPolls);
        setEditingPoll(null);
      } else {
        // Simular criação
        const newPoll = { ...pollData, id: Date.now(), createdAt: new Date().toISOString() };
        setPolls([...polls, newPoll]);
        setShowCreateForm(false);
      }
      
      // Reset form
      setFormData({
        title: '', description: '', options: ['', ''], 
        isActive: true, allowMultiple: false, endDate: ''
      });
    } catch (err) {
      console.error('Erro ao salvar enquete:', err);
    }
  };

  const handleEdit = (poll) => {
    setEditingPoll(poll);
    setFormData({
      ...poll,
      options: poll.options ? poll.options.map(opt => opt.text) : ['', '']
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (pollId) => {
    if (window.confirm('Tem certeza que deseja excluir esta enquete?')) {
      setPolls(polls.filter(poll => poll.id !== pollId));
    }
  };

  const togglePollStatus = async (pollId) => {
    const updatedPolls = polls.map(poll => 
      poll.id === pollId ? { ...poll, isActive: !poll.isActive } : poll
    );
    setPolls(updatedPolls);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingPoll(null);
    setFormData({
      title: '', description: '', options: ['', ''], 
      isActive: true, allowMultiple: false, endDate: ''
    });
  };

  const getTotalVotes = (poll) => {
    if (!poll.options) return 0;
    return poll.options.reduce((sum, option) => sum + (option.votes || 0), 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-900 border-r-orange-500 mx-auto mb-4"></div>
          <p className="text-blue-700 font-semibold text-lg">Carregando enquetes...</p>
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
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Gerenciar Enquetes</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin/dashboard" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Dashboard</a>
              <a href="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Eventos</a>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Breadcrumb */}
        <AdminBreadcrumb 
          items={[
            { label: 'Enquetes', href: null }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                📊 Gerenciar Enquetes
              </h1>
              <p className="text-slate-700 text-lg">
                Crie e gerencie enquetes para coletar feedback da comunidade UNASP
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-orange-600 via-orange-700 to-yellow-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-700 hover:via-orange-800 hover:to-yellow-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Enquete
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-orange-200/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-6">
              {editingPoll ? '✏️ Editar Enquete' : '➕ Criar Nova Enquete'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Título da Enquete</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-200/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="Ex: Qual evento você gostaria de ter no próximo semestre?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Data de Encerramento</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-200/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  placeholder="Descreva o contexto e objetivo da enquete..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-3">Opções de Resposta</label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-200/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                        placeholder={`Opção ${index + 1}`}
                        required
                      />
                      {formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-600 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {formData.options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-3 text-orange-600 hover:text-orange-800 font-semibold flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Opção
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowMultiple"
                    checked={formData.allowMultiple}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-200"
                  />
                  <label className="ml-3 text-sm font-medium text-blue-900">Permitir múltiplas escolhas</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-200"
                  />
                  <label className="ml-3 text-sm font-medium text-blue-900">Enquete ativa (visível para estudantes)</label>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingPoll ? 'Salvar Alterações' : 'Criar Enquete'}
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

        {/* Polls List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {polls.map((poll) => {
            const totalVotes = getTotalVotes(poll);
            return (
              <div key={poll.id} className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-xl p-6 border border-orange-200/30 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{poll.title}</h3>
                    {poll.description && (
                      <p className="text-blue-700 text-sm mb-3">{poll.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => togglePollStatus(poll.id)}
                      className={`p-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                        poll.isActive 
                          ? 'text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500'
                          : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600'
                      }`}
                    >
                      {poll.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(poll)}
                      className="p-2 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(poll.id)}
                      className="p-2 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Poll Results */}
                {poll.options && poll.options.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {poll.options.map((option, index) => {
                      const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                      return (
                        <div key={index} className="bg-white/50 rounded-xl p-3 border border-orange-200/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-blue-900">{option.text}</span>
                            <span className="text-sm text-blue-700 font-semibold">{option.votes} votos</span>
                          </div>
                          <div className="w-full bg-orange-100 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-orange-600 mt-1">{percentage.toFixed(1)}%</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-orange-200/30">
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      poll.isActive 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                    }`}>
                      {poll.isActive ? '✅ Ativa' : '⏸️ Inativa'}
                    </span>
                    
                    <div className="flex items-center text-sm text-orange-600">
                      <Users className="w-4 h-4 mr-1" />
                      {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'}
                    </div>
                  </div>
                  
                  {poll.endDate && (
                    <div className="flex items-center text-sm text-blue-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(poll.endDate).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {polls.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma enquete encontrada</h3>
            <p className="text-gray-500 mb-6">Comece criando sua primeira enquete para coletar feedback da comunidade!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-orange-600 to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Criar Primeira Enquete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPollsPage;