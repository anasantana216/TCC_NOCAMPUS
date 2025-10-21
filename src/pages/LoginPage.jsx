import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, UserCheck, Shield, Users, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    studentId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'student',
      label: 'Aluno',
      icon: User,
      color: 'blue',
      description: 'Acesse eventos e enquetes como estudante'
    },
    {
      id: 'admin',
      label: 'Administrador',
      icon: Shield,
      color: 'purple',
      description: 'Gerencie eventos, enquetes e usuários'
    },
    {
      id: 'guardian',
      label: 'Responsável',
      icon: Users,
      color: 'green',
      description: 'Acompanhe atividades e eventos'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulação de autenticação - aqui você integraria com sua API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular dados do usuário
      const userData = {
        email: formData.email,
        userType: userType,
        name: userType === 'student' ? 'João Silva' : 
              userType === 'admin' ? 'Admin Sistema' : 'Maria Santos (Responsável)',
        loginTime: new Date().toISOString()
      };
      
      // Salvar no localStorage para simular autenticação
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirecionar baseado no tipo de usuário
      switch(userType) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'guardian':
          navigate('/guardian/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const selectedType = userTypes.find(type => type.id === userType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 via-white to-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-orange-200/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-2xl p-8 border border-blue-200/30 backdrop-blur-sm relative">
          
          <Link to="/" className="flex justify-center items-center mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 bg-clip-text text-transparent">
              <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">No</span><span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Campus</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
            🔑 Entre na sua conta
          </h2>
          <p className="mt-4 text-center text-sm text-orange-600 font-semibold bg-gradient-to-r from-orange-50 to-yellow-50 py-3 px-6 rounded-full border border-orange-200/50 shadow-md">
            Centro Universitário Adventista de Engenheiro Coelho - UNASP
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-gradient-to-br from-white to-blue-50/30 py-8 px-6 shadow-2xl rounded-3xl border border-blue-200/30 backdrop-blur-sm">
          
          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-blue-900 mb-4">
              👤 Selecione o tipo de usuário
            </label>
            <div className="grid grid-cols-1 gap-2">
              {userTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = userType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left shadow-lg hover:shadow-xl transform hover:scale-102 ${
                      isSelected
                        ? type.color === 'blue' ? 'border-blue-600 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 shadow-blue-200/50' :
                          type.color === 'purple' ? 'border-orange-500 bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-100 shadow-orange-200/50' :
                          'border-yellow-500 bg-gradient-to-r from-yellow-50 via-green-50 to-yellow-100 shadow-yellow-200/50'
                        : 'border-blue-200/50 hover:border-blue-400/70 bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-md transition-all duration-300 ${
                        isSelected 
                          ? type.color === 'blue' ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-300/50' :
                            type.color === 'purple' ? 'bg-gradient-to-br from-orange-500 to-yellow-600 shadow-orange-300/50' : 
                            'bg-gradient-to-br from-yellow-500 to-green-600 shadow-yellow-300/50'
                          : type.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-indigo-200' :
                            type.color === 'purple' ? 'bg-gradient-to-br from-orange-100 to-yellow-200' : 
                            'bg-gradient-to-br from-yellow-100 to-green-200'
                      }`}>
                        <IconComponent className={`w-6 h-6 transition-all duration-300 ${
                          isSelected ? 'text-white scale-110' : 
                          type.color === 'blue' ? 'text-blue-700' :
                          type.color === 'purple' ? 'text-orange-700' : 'text-yellow-700'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          isSelected ? 
                            type.color === 'blue' ? 'text-blue-900' :
                            type.color === 'purple' ? 'text-purple-900' : 'text-green-900'
                          : 'text-gray-900'
                        }`}>
                          {type.label}
                        </div>
                        <div className={`text-xs ${
                          isSelected ? 
                            type.color === 'blue' ? 'text-blue-700' :
                            type.color === 'purple' ? 'text-purple-700' : 'text-green-700'
                          : 'text-gray-500'
                        }`}>
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email {userType === 'student' ? 'Institucional' : ''}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border-2 border-blue-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all"
                  placeholder={
                    userType === 'student' ? 'seunome@eaportal.unasp.org' :
                    userType === 'admin' ? 'seunome@eaportaladmin.unasp.org' :
                    userType === 'guardian' ? 'seunome@eaportalpais.unasp.org' :
                    'seu.email@exemplo.com'
                  }
                />
              </div>
            </div>

            {/* Student ID Field (apenas para estudantes) */}
            {userType === 'student' && (
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                  RA (Registro Acadêmico)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    required={userType === 'student'}
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Digite seu RA"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border-2 border-blue-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm font-bold rounded-xl text-white transition-all bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  `Entrar como ${selectedType.label}`
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                ← Voltar à página inicial
              </Link>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Não tem uma conta? Entre em contato com a secretaria acadêmica
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;