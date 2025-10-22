import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit3, Trash2, Search, Filter, Eye, UserPlus, Mail, Phone, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'student', status: 'active', 
    course: '', semester: '', guardianName: '', guardianEmail: ''
  });

  // Dados simulados de usuários
  const mockUsers = [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@unasp.edu.br",
      phone: "(19) 99999-1234",
      role: "student",
      status: "active",
      course: "Engenharia da Computação",
      semester: "6º semestre",
      registeredAt: "2024-02-15",
      lastLogin: "2024-10-15T10:30:00",
      guardianName: "Maria Silva",
      guardianEmail: "maria.silva@email.com"
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@unasp.edu.br",
      phone: "(19) 98888-5678",
      role: "student",
      status: "active",
      course: "Administração",
      semester: "4º semestre",
      registeredAt: "2024-03-10",
      lastLogin: "2024-10-14T16:45:00",
      guardianName: "João Santos",
      guardianEmail: "joao.santos@email.com"
    },
    {
      id: 3,
      name: "Prof. Marina Costa",
      email: "marina.costa@unasp.edu.br",
      phone: "(19) 97777-9012",
      role: "admin",
      status: "active",
      department: "Tecnologia",
      registeredAt: "2023-08-01",
      lastLogin: "2024-10-15T09:15:00"
    },
    {
      id: 4,
      name: "Roberto Oliveira",
      email: "roberto.oliveira@email.com",
      phone: "(19) 96666-3456",
      role: "guardian",
      status: "active",
      registeredAt: "2024-02-15",
      lastLogin: "2024-10-13T20:30:00",
      studentName: "Ana Silva"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...formData, id: editingUser.id } : user
      ));
      setEditingUser(null);
    } else {
      const newUser = { 
        ...formData, 
        id: Date.now(), 
        registeredAt: new Date().toISOString().split('T')[0],
        lastLogin: null
      };
      setUsers([...users, newUser]);
      setShowCreateForm(false);
    }
    setFormData({
      name: '', email: '', phone: '', role: 'student', status: 'active',
      course: '', semester: '', guardianName: '', guardianEmail: ''
    });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUser(user);
    setShowCreateForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleLabel = (role) => {
    const labels = {
      student: 'Estudante',
      admin: 'Administrador',
      guardian: 'Responsável'
    };
    return labels[role] || role;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      admin: 'bg-slate-100 text-slate-800',
      guardian: 'bg-blue-100 text-blue-700'
    };
    return colors[role] || 'bg-slate-100 text-slate-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-900 border-r-slate-500 mx-auto mb-4"></div>
          <p className="text-slate-700 font-semibold text-lg">Carregando usuários...</p>
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
                <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-blue-900 to-slate-800 bg-clip-text text-transparent font-semibold">Usuários</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin/events" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Eventos</a>
              <a href="/admin/polls" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Enquetes</a>
              <a href="/admin/notices" className="text-blue-900 hover:text-white bg-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-700 transition-all duration-300 font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-lg">Avisos</a>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Breadcrumb */}
        <AdminBreadcrumb 
          items={[
            { label: 'Usuários', href: null }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                👥 Gerenciar Usuários
              </h1>
              <p className="text-slate-700 text-lg">
                Administre contas de estudantes, responsáveis e funcionários
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-slate-800 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Usuário
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total de Usuários</p>
                <p className="text-3xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm font-medium">Estudantes</p>
                <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.role === 'student').length}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl">
                <Users className="w-8 h-8 text-slate-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Responsáveis</p>
                <p className="text-3xl font-bold text-blue-900">{users.filter(u => u.role === 'guardian').length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-blue-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm font-medium">Ativos</p>
                <p className="text-3xl font-bold text-slate-800">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl">
                <CheckCircle className="w-8 h-8 text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-blue-200/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-80"
                />
              </div>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os Tipos</option>
                <option value="student">Estudantes</option>
                <option value="admin">Administradores</option>
                <option value="guardian">Responsáveis</option>
              </select>
            </div>
            
            <div className="text-sm text-slate-600">
              {filteredUsers.length} de {users.length} usuários
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-200/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Usuário</th>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Contato</th>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Tipo</th>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Info Adicional</th>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-blue-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-blue-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.email}</div>
                        <div className="text-xs text-slate-500">
                          Cadastro: {new Date(user.registeredAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="flex items-center text-slate-700">
                          <Phone className="w-4 h-4 mr-1" />
                          {user.phone}
                        </div>
                        <div className="flex items-center text-slate-700 mt-1">
                          <Mail className="w-4 h-4 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-700">
                        {user.course && <div>📚 {user.course}</div>}
                        {user.semester && <div>🎓 {user.semester}</div>}
                        {user.department && <div>🏢 {user.department}</div>}
                        {user.studentName && <div>👨‍🎓 {user.studentName}</div>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Ativo</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Inativo</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[99999]">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-blue-900">
                  {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Usuário *</label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="student">Estudante</option>
                      <option value="admin">Administrador</option>
                      <option value="guardian">Responsável</option>
                    </select>
                  </div>
                </div>

                {formData.role === 'student' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Curso</label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Semestre</label>
                      <input
                        type="text"
                        value={formData.semester}
                        onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Responsável</label>
                      <input
                        type="text"
                        value={formData.guardianName}
                        onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email do Responsável</label>
                      <input
                        type="email"
                        value={formData.guardianEmail}
                        onChange={(e) => setFormData({...formData, guardianEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingUser(null);
                      setFormData({
                        name: '', email: '', phone: '', role: 'student', status: 'active',
                        course: '', semester: '', guardianName: '', guardianEmail: ''
                      });
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {editingUser ? 'Atualizar' : 'Criar'} Usuário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;