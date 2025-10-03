import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Bell, ArrowRight, Lock } from 'lucide-react';

const HomePage = () => {

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto border-t-4 border-blue-900">
          <h1 className="text-6xl font-bold text-blue-900 mb-6">
            🎓 Bem-vindo ao <span className="text-blue-900">No</span><span className="text-yellow-500">Campus</span>
          </h1>
          <p className="text-xl text-blue-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Sua plataforma central para descobrir eventos, participar de enquetes e conectar-se com a comunidade universitária do UNASP EC.
          </p>
          <p className="text-lg text-orange-600 font-bold mb-8 bg-orange-50 py-2 px-4 rounded-full inline-block">
            Centro Universitário Adventista de Engenheiro Coelho - UNASP
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/about"
              className="bg-blue-900 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-800 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl font-semibold"
            >
              📚 Saiba Mais
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-xl text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl font-semibold"
            >
              🔑 Fazer Login
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Login Required Section */}
      <section className="py-16">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center border-t-4 border-orange-500 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">🔐 Acesso Restrito</h2>
          <p className="text-blue-700 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Para acessar eventos, participar de enquetes e interagir com a comunidade universitária, 
            é necessário fazer login com suas credenciais do UNASP EC.
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-10 py-4 rounded-xl text-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl font-semibold"
          >
            🎓 Fazer Login para Continuar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
            🌟 Por que usar o <span className="text-blue-900">No</span><span className="text-yellow-500">Campus</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-900 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Target className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">🎯 Eventos Personalizados</h3>
              <p className="text-blue-700 leading-relaxed">Faça login para descobrir eventos que combinam com seus interesses e área de estudo no UNASP EC.</p>
            </div>
            <div className="text-center bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Bell className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">📢 Participação Ativa</h3>
              <p className="text-blue-700 leading-relaxed">Faça login para participar de enquetes e contribuir para as decisões da comunidade universitária.</p>
            </div>
            <div className="text-center bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500 hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users className="w-10 h-10 text-yellow-700" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">👥 Comunidade</h3>
              <p className="text-blue-700 leading-relaxed">Conecte-se com outros estudantes e construa relacionamentos duradouros.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;