'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    return email.endsWith('@eaportal.unasp.br') || email.endsWith('@adm.unasp.br');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação do email institucional conforme especificação
    if (!validateEmail(email)) {
      setError('Por favor, utilize seu email institucional (@eaportal.unasp.br ou @adm.unasp.br).');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de autenticação - será substituído pela API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular armazenamento de dados do usuário
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');
      
      const isAdmin = email.includes('@adm.unasp.br');
      localStorage.setItem('userRole', isAdmin ? 'ADMIN' : 'STUDENT');
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      router.push('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Balão Colorido com Logo */}
        <div className="relative mb-8">
          <div className="w-64 h-48 mx-auto relative">
            {/* Balão principal com gradiente colorido */}
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full relative overflow-hidden shadow-2xl">
              {/* Efeito de brilho no balão */}
              <div className="absolute top-4 left-6 w-8 h-8 bg-white opacity-30 rounded-full blur-sm"></div>
              <div className="absolute top-6 left-8 w-4 h-4 bg-white opacity-40 rounded-full blur-sm"></div>
              
              {/* Logo UNASP no centro do balão */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <svg className="w-10 h-10 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L3 7V10C3 16 12 22 12 22S21 16 21 10V7L12 2M12 4.3L18 7.9V10C18 14.5 12 19.1 12 19.1S6 14.5 6 10V7.9L12 4.3M9 12L11 14L15 10"/>
                    </svg>
                  </div>
                  <div className="text-white font-bold text-sm drop-shadow-lg">
                    UNASP
                  </div>
                </div>
              </div>
            </div>
            
            {/* Corda do balão */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-12 bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Título LOGIN */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-wide">LOGIN</h1>
            <p className="text-slate-600 text-sm">
              acesse o seu email ePortal ou ADM
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Campo Email com estilo customizado */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="exemplo@eportal.unasp.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all text-slate-800 placeholder-slate-500"
                  required
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            {/* Campo Password com estilo customizado */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all text-slate-800 placeholder-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Checkbox Lembrar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Lembrar de mim
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-500 font-medium"
                onClick={() => alert('Funcionalidade será implementada em breve')}
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </div>
              ) : 'Entrar'}
            </button>

            {/* Botão Error (como no design) */}
            <button
              type="button"
              className="w-full bg-slate-700 text-white py-3 px-6 rounded-2xl font-medium hover:bg-slate-800 transition-all"
              onClick={() => setError('')}
            >
              Error
            </button>
          </form>

          {/* Nome do App */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">NoCampus</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Av Sistema de agendamento com enquetes desenvolvido para<br />
              Centro Universitário Adventista de São Paulo
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Ainda não tem uma conta?{' '}
              <button
                type="button"
                className="text-orange-600 hover:text-orange-500 font-medium"
                onClick={() => alert('Funcionalidade de cadastro será implementada em breve')}
              >
                Solicitar acesso
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}