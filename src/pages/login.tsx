import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validação do email baseado no tipo de usuário
    if (userType === 'student') {
      if (!email.endsWith('@eaportal.unasp.br') && !email.endsWith('@adm.unasp.br')) {
        alert('Por favor, utilize seu email do eaportal ou adm.');
        setLoading(false);
        return;
      }
    } else {
      if (!email.endsWith('.admin@unasp.org')) {
        alert('Por favor, utilize seu email administrativo (.admin@unasp.org).');
        setLoading(false);
        return;
      }
    }
    
    // Simular login (aqui seria feita a chamada à API)
    setTimeout(() => {
      setLoading(false);
      alert('Login realizado com sucesso!');
      
      // Redirecionar baseado no tipo de usuário
      if (userType === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-50">
      {/* Botão de volta */}
      <Link href="/" className="absolute top-4 left-4 text-primary hover:text-primary-dark flex items-center transition-colors">
        <span className="mr-2">←</span>
        Voltar para Home
      </Link>
      
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border-t-4 border-secondary">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Login <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
          </h2>
          <p className="text-gray-600 mb-1">
            Entre com suas credenciais
          </p>
          <p className="text-sm text-primary font-medium">
            Centro Universitário Adventista de São Paulo - UNASP
          </p>
        </div>
        
        {/* User Type Selection */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'student' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Estudante
          </button>
          <button
            type="button"
            onClick={() => setUserType('admin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              userType === 'admin' 
                ? 'bg-secondary text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Administrador
          </button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                placeholder={
                  userType === 'student' 
                    ? 'seu.email@eaportal.unasp.br' 
                    : 'usuario.admin@unasp.org'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Primeira vez aqui?{' '}
              <a href="#" className="text-secondary hover:text-secondary-dark transition-colors">
                Saiba como acessar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
