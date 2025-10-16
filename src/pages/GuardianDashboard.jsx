import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, BookOpen, MessageCircle, Bell, TrendingUp, Award, FileText, Eye, X } from 'lucide-react';
import LogoutButton from '../components/LogoutButton';

const GuardianDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [studentInfo] = useState({
    name: "Ana Beatriz Silva",
    course: "Engenharia da Computação",
    semester: "6º Semestre", 
    gpa: "8.7",
    attendance: "92",
    credits: 180,
    totalCredits: 240
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "grade",
      title: "Nova nota lançada",
      message: "Nota da disciplina Algoritmos e Estruturas de Dados foi lançada",
      date: "2024-10-15",
      read: false,
    },
    {
      id: 2,
      type: "event",
      title: "Evento próximo",
      message: "Seminário de Engenharia acontece amanhã às 14h",
      date: "2024-10-14",
      read: false,
    },
    {
      id: 3,
      type: "financial",
      title: "Mensalidade",
      message: "Lembrete: mensalidade vence em 5 dias",
      date: "2024-10-13",
      read: true,
    }
  ]);

  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });

  const recentGrades = [
    {
      subject: "Algoritmos e Estruturas de Dados",
      assignment: "Prova P2",
      score: 8.5,
      date: "15/10/2024"
    },
    {
      subject: "Cálculo Diferencial e Integral II",
      assignment: "Lista de Exercícios 3",
      score: 9.0,
      date: "12/10/2024"
    },
    {
      subject: "Física II",
      assignment: "Relatório de Laboratório",
      score: 7.8,
      date: "10/10/2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-300/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-teal-300/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-green-300/25 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Portal do Responsável</h1>
                    <p className="text-green-100 text-sm">UNASP Engenheiro Coelho</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200/50 shadow-md">
                  <p className="text-sm text-green-700">Responsável por:</p>
                  <p className="font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">{studentInfo.name}</p>
                </div>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contato
                </button>
                <LogoutButton variant="default" size="medium" showIcon={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent mb-4">
            Portal do Responsável 👨‍👩‍👧‍👦
          </h1>
          <p className="text-emerald-700 text-xl font-medium">
            Acompanhe a vida acadêmica e atividades do estudante na UNASP Engenheiro Coelho
          </p>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-green-200/30 backdrop-blur-sm relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-teal-500 to-green-500 rounded-full"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent mb-6 flex items-center">
            👨‍🎓 Informações do Estudante
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-100 via-green-200 to-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/30">
              <User className="w-10 h-10 text-green-800 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm text-green-700 mb-2 font-medium">Nome Completo</p>
              <p className="font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent text-sm">{studentInfo.name}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/30">
              <BookOpen className="w-10 h-10 text-emerald-700 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm text-emerald-700 mb-2 font-medium">Curso</p>
              <p className="font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent text-sm">{studentInfo.course}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-teal-100 via-teal-200 to-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/30">
              <Calendar className="w-10 h-10 text-teal-700 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm text-teal-700 mb-2 font-medium">Período</p>
              <p className="font-bold bg-gradient-to-r from-teal-700 to-green-700 bg-clip-text text-transparent">{studentInfo.semester}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-100 via-green-200 to-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/30">
              <TrendingUp className="w-10 h-10 text-green-700 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm text-green-700 mb-2 font-medium">CRA</p>
              <p className="font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">{studentInfo.gpa}</p>
            </div>
          </div>
        </div>

        {/* Academic Progress */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-green-200/30">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent mb-6 flex items-center">
            📊 Progresso Acadêmico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">Créditos Cursados</h3>
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div className="relative">
                <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000" 
                    style={{width: `${(studentInfo.credits / studentInfo.totalCredits) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-green-700">{studentInfo.credits} de {studentInfo.totalCredits} créditos</p>
                <p className="text-2xl font-bold text-green-800 mt-2">{Math.round((studentInfo.credits / studentInfo.totalCredits) * 100)}%</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-800">Desempenho</h3>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-800 mb-2">{studentInfo.gpa}</p>
              <p className="text-sm text-emerald-700">Coeficiente de Rendimento Acadêmico</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Excelente
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-2xl border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-teal-800">Presença</h3>
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-3xl font-bold text-teal-800 mb-2">{studentInfo.attendance}%</p>
              <p className="text-sm text-teal-700">Frequência nas aulas</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Dentro do esperado
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Grades and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-2xl p-8 border border-green-200/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent mb-6 flex items-center">
                📝 Notas Recentes
              </h2>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-green-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-green-900 group-hover:text-green-700 transition-colors duration-300">{grade.subject}</h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        grade.score >= 8 ? 'bg-green-100 text-green-800' : 
                        grade.score >= 7 ? 'bg-emerald-100 text-emerald-800' : 
                        'bg-teal-100 text-teal-800'
                      }`}>
                        {grade.score}/10
                      </span>
                    </div>
                    <p className="text-green-800 font-medium mb-1">{grade.assignment}</p>
                    <p className="text-green-600 text-sm">{grade.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl shadow-2xl p-8 border border-emerald-200/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent mb-6 flex items-center">
                ⚡ Ações Rápidas
              </h2>
              <div className="space-y-4">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group relative"
                >
                  <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Ver Notificações 
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Contato Coordenação
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                  <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Agenda de Provas
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                  <BookOpen className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Material Didático
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Histórico Escolar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Important Alerts */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">⚠️ Avisos Importantes</h3>
                <div className="space-y-2">
                  <p className="text-sm text-green-700">
                    • <strong>Período de Matrículas:</strong> De 15 a 30 de dezembro
                  </p>
                  <p className="text-sm text-green-700">
                    • <strong>Recesso Acadêmico:</strong> 23 de dezembro a 6 de janeiro
                  </p>
                  <p className="text-sm text-green-700">
                    • <strong>Início das Aulas:</strong> 10 de fevereiro de 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <Bell className="w-6 h-6 mr-2" />
                  Central de Notificações
                </h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-white hover:text-green-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border-l-4 ${
                        notification.read
                          ? 'bg-gray-50 border-gray-400'
                          : 'bg-green-50 border-green-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-900 mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-green-700 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-green-600">{notification.date}</p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => {
                              setNotifications(notifications.map(n =>
                                n.id === notification.id ? { ...n, read: true } : n
                              ));
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded-full text-xs hover:bg-green-700 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhuma notificação no momento</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Contato com a Coordenação
                </h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-white hover:text-emerald-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Mensagem enviada com sucesso!');
                setShowContactForm(false);
                setContactForm({ subject: '', message: '', priority: 'normal' });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Digite o assunto da mensagem"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Prioridade
                    </label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="normal">Normal</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Digite sua mensagem aqui..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianDashboard;