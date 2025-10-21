import React, { useState, useEffect } from 'react';
import { Bell, Plus, Edit3, Trash2, Send, AlertCircle, Info, CheckCircle, Users, Calendar, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { noticesAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

const AdminNoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'normal',
    targetAudience: 'all',
    isActive: true
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await noticesAPI.getAll();
      setNotices(response.data);
    } catch (err) {
      console.error('Erro ao carregar avisos:', err);
    } finally {
      setLoading(false);
    }
  };

  const noticeTypes = [
    { value: 'info', label: 'Informativo', icon: Info, color: 'blue' },
    { value: 'warning', label: 'Aviso Importante', icon: AlertCircle, color: 'yellow' },
    { value: 'success', label: 'Comunicado Positivo', icon: CheckCircle, color: 'green' },
    { value: 'urgent', label: 'Urgente', icon: Bell, color: 'red' }
  ];

  const priorities = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' }
  ];

  const audiences = [
    { value: 'students', label: 'Estudantes' },
    { value: 'guardians', label: 'Responsáveis' },
    { value: 'staff', label: 'Funcionários' },
    { value: 'all', label: 'Todos' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAudienceChange = (audienceValue) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audienceValue)
        ? prev.targetAudience.filter(a => a !== audienceValue)
        : [...prev.targetAudience, audienceValue]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noticeData = {
        ...formData,
        id: editingNotice ? editingNotice.id : Date.now(),
        createdAt: editingNotice ? editingNotice.createdAt : new Date().toISOString(),
        views: editingNotice ? editingNotice.views : 0
      };

      if (editingNotice) {
        setNotices(notices.map(notice => 
          notice.id === editingNotice.id ? noticeData : notice
        ));
        setEditingNotice(null);
      } else {
        setNotices([noticeData, ...notices]);
        setShowCreateForm(false);
      }
      
      // Reset form
      setFormData({
        title: '', content: '', type: 'info', priority: 'medium',
        targetAudience: [], publishDate: '', expiryDate: '', isActive: true
      });
    } catch (err) {
      console.error('Erro ao salvar aviso:', err);
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({ ...notice });
    setShowCreateForm(true);
  };

  const handleDelete = (noticeId) => {
    if (window.confirm('Tem certeza que deseja excluir este aviso?')) {
      setNotices(notices.filter(notice => notice.id !== noticeId));
    }
  };

  const toggleNoticeStatus = (noticeId) => {
    setNotices(notices.map(notice => 
      notice.id === noticeId ? { ...notice, isActive: !notice.isActive } : notice
    ));
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingNotice(null);
    setFormData({
      title: '', content: '', type: 'info', priority: 'medium',
      targetAudience: [], publishDate: '', expiryDate: '', isActive: true
    });
  };

  const getTypeConfig = (type) => {
    return noticeTypes.find(t => t.value === type) || noticeTypes[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
              <span className="bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent font-semibold">Gerenciar Avisos</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href="/admin/dashboard" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Dashboard</a>
              <a href="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Eventos</a>
              <a href="/admin/polls" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg text-sm">Enquetes</a>
              <a href="/admin/notices" className="text-white bg-gradient-to-r from-blue-600 to-blue-700 font-medium px-3 py-2 rounded-lg shadow-md text-sm">Avisos</a>
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
            { label: 'Avisos', href: null }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                📢 Gerenciar Avisos
              </h1>
              <p className="text-slate-700 text-lg">
                Crie e publique avisos importantes para a comunidade UNASP
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Aviso
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-purple-200/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              {editingNotice ? '✏️ Editar Aviso' : '➕ Criar Novo Aviso'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Título do Aviso</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Ex: Período de Matrículas 2025.1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Conteúdo</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Digite o conteúdo completo do aviso..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Tipo de Aviso</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    {noticeTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Prioridade</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Status</label>
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-200"
                    />
                    <label className="ml-3 text-sm font-medium text-blue-900">Publicar imediatamente</label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Data de Publicação</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Data de Expiração</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-3">Público-Alvo</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {audiences.map(audience => (
                    <div key={audience.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.targetAudience.includes(audience.value)}
                        onChange={() => handleAudienceChange(audience.value)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-200"
                      />
                      <label className="ml-2 text-sm text-blue-900">{audience.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {editingNotice ? 'Salvar Alterações' : 'Publicar Aviso'}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notices List */}
        <div className="space-y-6">
          {notices.map((notice) => {
            const typeConfig = getTypeConfig(notice.type);
            const IconComponent = typeConfig.icon;
            
            return (
              <div key={notice.id} className="bg-gradient-to-br from-white to-purple-50/30 rounded-3xl shadow-xl p-6 border border-purple-200/30 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                      typeConfig.color === 'blue' ? 'from-blue-100 to-blue-200' :
                      typeConfig.color === 'yellow' ? 'from-yellow-100 to-yellow-200' :
                      typeConfig.color === 'green' ? 'from-green-100 to-green-200' :
                      'from-red-100 to-red-200'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        typeConfig.color === 'blue' ? 'text-blue-600' :
                        typeConfig.color === 'yellow' ? 'text-yellow-600' :
                        typeConfig.color === 'green' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-blue-900">{notice.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                          {priorities.find(p => p.value === notice.priority)?.label}
                        </span>
                      </div>
                      
                      <p className="text-blue-700 mb-4 leading-relaxed">{notice.content}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-blue-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {notice.targetAudience.map(audience => 
                            audiences.find(a => a.value === audience)?.label
                          ).join(', ')}
                        </div>
                        
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {notice.views} visualizações
                        </div>
                        
                        {notice.publishDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Publicado: {new Date(notice.publishDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                        
                        {notice.expiryDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Expira: {new Date(notice.expiryDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      notice.isActive 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                    }`}>
                      {notice.isActive ? '✅ Ativo' : '⏸️ Inativo'}
                    </span>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => toggleNoticeStatus(notice.id)}
                        className={`p-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                          notice.isActive 
                            ? 'text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500'
                            : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600'
                        }`}
                      >
                        {notice.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      
                      <button
                        onClick={() => handleEdit(notice)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="p-2 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notices.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum aviso encontrado</h3>
            <p className="text-gray-500 mb-6">Comece criando seu primeiro aviso para a comunidade UNASP!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Criar Primeiro Aviso
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNoticesPage;