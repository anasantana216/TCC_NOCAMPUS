import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Edit3, Trash2, Eye, EyeOff, Save, X, AlertCircle, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      setLoading(true);
      
      const pollData = {
        title: formData.title,
        description: formData.description,
        allowMultiple: formData.allowMultiple,
        endDate: formData.endDate,
        isActive: formData.isActive,
        options: formData.options.filter(opt => opt.trim() !== '')
      };

      if (editingPoll) {
        const response = await pollsAPI.update(editingPoll.id, pollData);
        const updatedPolls = polls.map(poll => 
          poll.id === editingPoll.id ? response.data : poll
        );
        setPolls(updatedPolls);
        setEditingPoll(null);
      } else {
        const response = await pollsAPI.create(pollData);
        setPolls([response.data, ...polls]);
        setShowCreateForm(false);
      }
      
      setFormData({
        title: '', description: '', options: ['', ''], 
        isActive: true, allowMultiple: false, endDate: ''
      });
      
    } catch (err) {
      console.error('Erro ao salvar enquete:', err);
      alert('Erro ao salvar enquete. Tente novamente.');
    } finally {
      setLoading(false);
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
      try {
        await pollsAPI.delete(pollId);
        setPolls(polls.filter(poll => poll.id !== pollId));
      } catch (err) {
        console.error('Erro ao excluir enquete:', err);
        alert('Erro ao excluir enquete. Tente novamente.');
      }
    }
  };

  const togglePollStatus = async (poll) => {
    try {
      const response = await pollsAPI.update(poll.id, { 
        ...poll, 
        isActive: !poll.isActive 
      });
      const updatedPolls = polls.map(p => 
        p.id === poll.id ? response.data : p
      );
      setPolls(updatedPolls);
    } catch (err) {
      console.error('Erro ao alterar status da enquete:', err);
      alert('Erro ao alterar status da enquete. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingPoll(null);
    setFormData({
      title: '', description: '', options: ['', ''], 
      isActive: true, allowMultiple: false, endDate: ''
    });
  };

  if (loading && polls.length === 0) {
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
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-slate-300/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-300/15 to-blue-100/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="bg-gradient-to-r from-white via-blue-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-blue-900 to-blue-800 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="text-2xl font-bold group">
                <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Gerenciar Enquetes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/admin/dashboard" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Dashboard</Link>
              <Link to="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Eventos</Link>
              <span className="text-white bg-gradient-to-r from-blue-600 to-blue-700 font-medium px-3 py-2 rounded-lg shadow-md text-sm">Enquetes</span>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <AdminBreadcrumb items={[{ label: 'Enquetes', href: null }]} />
        
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                📊 Gerenciar Enquetes
              </h1>
              <p className="text-slate-700 text-lg">
                Crie e gerencie enquetes para coletar feedback da comunidade
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Enquete
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-blue-200/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-6">
              {editingPoll ? '✏️ Editar Enquete' : '➕ Criar Nova Enquete'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Título da Enquete</label>
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
                <label className="block text-sm font-bold text-blue-900 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Opções</label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Opção ${index + 1}`}
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      required
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {formData.options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Adicionar opção
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Data de Encerramento (opcional)</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                
                <div className="flex items-center space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="allowMultiple"
                      checked={formData.allowMultiple}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                    />
                    <label className="ml-3 text-sm font-medium text-blue-900">Permitir múltipla escolha</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
                    />
                    <label className="ml-3 text-sm font-medium text-blue-900">Enquete ativa</label>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Salvando...' : (editingPoll ? 'Atualizar' : 'Criar Enquete')}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {polls.length > 0 ? (
          <div className="grid gap-6">
            {polls.map((poll) => (
              <div key={poll.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-blue-900">{poll.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      poll.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {poll.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePollStatus(poll)}
                      className={`p-2 rounded-lg transition-colors ${
                        poll.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={poll.isActive ? 'Desativar enquete' : 'Ativar enquete'}
                    >
                      {poll.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(poll)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                      title="Editar enquete"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(poll.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Excluir enquete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {poll.description && (
                  <p className="text-gray-600 mb-4">{poll.description}</p>
                )}
                
                <div className="space-y-2">
                  {poll.options?.map((option, index) => {
                    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    
                    return (
                      <div key={option.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <span className="font-medium">{option.text}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 min-w-[60px]">
                            {option.votes} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Total de votos: {poll.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0}
                  </span>
                  <span>
                    Criada em: {new Date(poll.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Nenhuma enquete encontrada</h3>
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