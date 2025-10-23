import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Bell, ArrowRight, Lock } from 'lucide-react';

const HomePage = () => {

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-yellow-50 via-orange-50/30 via-amber-50 to-yellow-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-300/25 to-yellow-300/25 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl"></div>
        
        <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto border border-orange-200/30 backdrop-blur-sm relative">
          
          <h1 className="text-6xl font-bold text-blue-800 mb-6">
            🎓 Bem-vindo ao <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">No</span><span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Campus</span>
          </h1>
          <p className="text-xl text-blue-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Sua plataforma central para descobrir eventos, participar de enquetes e conectar-se com toda a comunidade educacional do UNASP EC.
          </p>
          <p className="text-lg text-orange-600 font-bold mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 py-3 px-6 rounded-full inline-block shadow-md border border-orange-200/50">
            Instituto de Ensino Adventista de Engenheiro Coelho - UNASP
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              to="/about"
              className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-8 py-4 rounded-2xl text-lg hover:from-blue-800 hover:via-blue-700 hover:to-indigo-800 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl font-semibold transform hover:scale-105 hover:rotate-1 border border-blue-700/30"
            >
              📚 Saiba Mais
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/login"
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white px-8 py-4 rounded-2xl text-lg hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl font-semibold transform hover:scale-105 hover:-rotate-1 border border-yellow-400/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">🔑 Fazer Login</span>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Login Required Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-yellow-100/30 to-orange-100/30"></div>
        <div className="bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-3xl shadow-2xl p-10 text-center border border-orange-200/50 max-w-4xl mx-auto relative backdrop-blur-sm">
          <div className="bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white/50">
            <Lock className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent mb-4">🔐 Acesso Restrito</h2>
          <p className="text-blue-700 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Para acessar eventos, participar de enquetes e interagir com a comunidade educacional, 
            é necessário fazer login com suas credenciais do UNASP EC.
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white px-10 py-4 rounded-2xl text-lg hover:from-blue-800 hover:via-indigo-700 hover:to-blue-800 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl font-semibold transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">🎓 Fazer Login para Continuar</span>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 bg-clip-text text-transparent mb-16">
            🌟 Por que usar o <span className="bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">No</span><span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Campus</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-xl p-8 border border-blue-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
              <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-white/50">
                <Target className="w-12 h-12 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent mb-4">🎯 Eventos Personalizados</h3>
              <p className="text-blue-700 leading-relaxed">Faça login para descobrir eventos que combinam com seus interesses e área de estudo no Instituto UNASP EC.</p>
            </div>
            <div className="text-center bg-gradient-to-br from-white to-orange-50/50 rounded-3xl shadow-xl p-8 border border-orange-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-white/50">
                <Bell className="w-12 h-12 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">📢 Participação Ativa</h3>
              <p className="text-blue-700 leading-relaxed">Faça login para participar de enquetes e contribuir para as decisões da comunidade educacional.</p>
            </div>
            <div className="text-center bg-gradient-to-br from-white to-yellow-50/50 rounded-3xl shadow-xl p-8 border border-yellow-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group">
              <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-white/50">
                <Users className="w-12 h-12 text-yellow-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">👥 Comunidade</h3>
              <p className="text-blue-700 leading-relaxed">Conecte-se com outros estudantes de todos os níveis de ensino e construa relacionamentos duradouros.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;