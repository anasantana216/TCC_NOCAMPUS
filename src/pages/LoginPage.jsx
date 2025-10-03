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
      
      // Redirecionar baseado no tipo de usuário
      switch(userType) {
        case 'student':
          navigate('/events');
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-blue-600">No</span><span className="text-yellow-500">Campus</span>
          </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Centro Universitário Adventista de São Paulo - UNASP
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecione o tipo de usuário
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
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? type.color === 'blue' ? 'border-blue-600 bg-blue-50' :
                          type.color === 'purple' ? 'border-purple-600 bg-purple-50' :
                          'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        isSelected 
                          ? type.color === 'blue' ? 'bg-blue-600' :
                            type.color === 'purple' ? 'bg-purple-600' : 'bg-green-600'
                          : type.color === 'blue' ? 'bg-blue-100' :
                            type.color === 'purple' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          isSelected ? 'text-white' : 
                          type.color === 'blue' ? 'text-blue-600' :
                          type.color === 'purple' ? 'text-purple-600' : 'text-green-600'
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
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
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-colors ${
                  selectedType.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' :
                  selectedType.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' :
                  'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
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