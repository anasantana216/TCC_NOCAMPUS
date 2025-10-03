import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Heart, BookOpen, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 bg-white rounded-2xl shadow-lg p-10 border-t-4 border-blue-900">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          📖 Sobre o <span className="text-blue-900">No</span><span className="text-yellow-500">Campus</span>
        </h1>
        <p className="text-xl text-orange-600 font-semibold bg-orange-50 py-2 px-4 rounded-full inline-block">
          🎓 Conectando a comunidade acadêmica do UNASP EC
        </p>
      </div>

      {/* Sobre o NoCampus */}
      <section className="bg-white rounded-2xl shadow-xl p-10 mb-8 border-t-4 border-orange-500">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-full flex items-center justify-center mr-6 shadow-md">
            <Target className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900">🎯 Por que o NoCampus foi criado?</h2>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            O <strong>NoCampus</strong> nasceu da necessidade de conectar melhor a comunidade acadêmica do 
            Centro Universitário Adventista de Engenheiro Coelho - UNASP.
          </p>
          
          <p>
            Nossa plataforma foi desenvolvida para facilitar a comunicação entre estudantes, professores, 
            funcionários e responsáveis, criando um ambiente digital centralizado onde todos podem:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Participar de Enquetes</h4>
                <p className="text-sm text-gray-600">Contribua com sua opinião em decisões importantes da instituição</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Descobrir Eventos</h4>
                <p className="text-sm text-gray-600">Fique por dentro de todas as atividades acadêmicas e sociais</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Conectar-se</h4>
                <p className="text-sm text-gray-600">Fortaleça os laços com a comunidade universitária</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Engajar-se</h4>
                <p className="text-sm text-gray-600">Participe ativamente da vida universitária</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o UNASP EC */}
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Centro Universitário Adventista de Engenheiro Coelho</h2>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            O <strong>Centro Universitário Adventista de Engenheiro Coelho - UNASP</strong> 
            é uma instituição de ensino superior confessional adventista, comprometida com a excelência 
            acadêmica e a formação integral dos estudantes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Nossa Missão</h3>
              <p className="text-gray-600">
                Educar no ambiente da fé cristã para a cidadania, promovendo a excelência acadêmica 
                e o desenvolvimento do caráter semelhante ao do Criador.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser reconhecida como uma instituição cristã de referência em educação, 
                contribuindo para a transformação positiva da sociedade.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Nossos Valores</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Excelência acadêmica
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Formação cristã
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Integridade e ética
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Responsabilidade social
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Inovação educacional
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Sustentabilidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Informações do Campus */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Campus Engenheiro Coelho</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">50+</div>
            <div className="text-blue-100">Cursos oferecidos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">15.000+</div>
            <div className="text-blue-100">Estudantes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300 mb-2">1969</div>
            <div className="text-blue-100">Ano de fundação</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Faça parte da nossa comunidade!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          O NoCampus é mais que uma plataforma - é o coração digital da nossa comunidade universitária. 
          Junte-se a nós e ajude a construir um campus ainda mais conectado e participativo.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Fazer Login
          </Link>
          <Link
            to="/"
            className="border-2 border-gray-400 text-gray-600 px-6 py-3 rounded-lg hover:border-gray-500 hover:text-gray-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;