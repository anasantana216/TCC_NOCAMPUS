import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, BookOpen, MessageCircle, Bell, TrendingUp, Award, FileText, Eye, X } from 'lucide-react';
import LogoutButton from '../components/LogoutButton';

const GuardianDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [studentInfo] = useState({
    name: "Ana Julia Boer Mataruco Sant'Ana",
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

  const [showEvents, setShowEvents] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showFinancial, setShowFinancial] = useState(false);
  const [showReports, setShowReports] = useState(false);

  // Eventos e datas importantes da escola
  const upcomingEvents = [
    {
      id: 1,
      title: "Semana de Provas - P2",
      date: "25/10/2024 - 01/11/2024",
      time: "08:00 - 12:00",
      location: "Campus UNASP-EC",
      type: "academic",
      description: "Segunda avaliação do semestre"
    },
    {
      id: 2,
      title: "Feira de Ciências e Tecnologia",
      date: "15/11/2024",
      time: "14:00 - 18:00",
      location: "Auditório Principal",
      type: "event",
      description: "Apresentação de projetos acadêmicos"
    },
    {
      id: 3,
      title: "Reunião de Pais e Responsáveis",
      date: "20/11/2024",
      time: "19:00 - 21:00",
      location: "Auditório Central",
      type: "meeting",
      description: "Apresentação do desempenho acadêmico"
    },
    {
      id: 4,
      title: "Matrícula 2025.1",
      date: "01/12/2024 - 15/12/2024",
      time: "08:00 - 17:00",
      location: "Secretaria Acadêmica",
      type: "enrollment",
      description: "Período de matrícula para próximo semestre"
    }
  ];

  // Dados financeiros
  const financialData = {
    currentMonth: {
      amount: "R$ 1.850,00",
      dueDate: "05/11/2024",
      status: "pending",
      installment: "10/12"
    },
    nextMonth: {
      amount: "R$ 1.850,00",
      dueDate: "05/12/2024",
      status: "upcoming"
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 via-white to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-green-200/15 to-emerald-300/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-emerald-300/15 to-green-100/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-white via-green-50/30 to-white shadow-2xl border-b-4 border-gradient-to-r from-green-700 to-green-600 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold group">
                <span className="bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">No</span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">Campus</span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent font-semibold">Portal do Responsável</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right bg-gradient-to-r from-white to-green-50 px-4 py-2 rounded-xl border border-green-200/50 shadow-md">
                <p className="text-sm text-gray-600">Responsável por:</p>
                <p className="font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">{studentInfo.name}</p>
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contato
              </button>
              <LogoutButton variant="default" size="medium" showIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* Financial Alert */}
        {financialData.currentMonth.status === 'pending' && (
          <div className="mb-6 bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-r-xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 text-white rounded-full p-2">
                  💰
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">Mensalidade Pendente</h3>
                  <p className="text-sm text-amber-700">
                    Valor: <strong>{financialData.currentMonth.amount}</strong> | 
                    Vencimento: <strong>{financialData.currentMonth.dueDate}</strong>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowFinancial(true)}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all text-sm font-medium"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent mb-4">
            Portal do Responsável 👨‍👩‍👧‍👦
          </h1>
          <p className="text-gray-700 text-xl font-medium">
            Acompanhe a vida acadêmica e atividades do estudante na UNASP Engenheiro Coelho
          </p>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-2xl p-8 mb-8 border border-green-200/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent mb-6 flex items-center">
            👨‍🎓 Informações do Estudante
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-xl p-6 border border-green-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">Nome Completo</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent mt-1">{studentInfo.name}</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                  <User className="w-8 h-8 text-green-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-xl p-6 border border-green-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">Curso</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mt-1">{studentInfo.course}</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 via-green-200 to-emerald-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                  <BookOpen className="w-8 h-8 text-green-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl shadow-xl p-6 border border-emerald-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-700 text-sm font-medium">Período</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mt-1">{studentInfo.semester}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 via-emerald-200 to-green-200 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                  <Calendar className="w-8 h-8 text-emerald-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl shadow-xl p-6 border border-green-200/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">CRA</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mt-1">{studentInfo.gpa}</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/50">
                  <TrendingUp className="w-8 h-8 text-green-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Academic Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-600">
            <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center">
              📊 Progresso Acadêmico
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800">Créditos Cursados</h3>
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div className="relative">
                  <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000" 
                      style={{width: `${(studentInfo.credits / studentInfo.totalCredits) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-green-700">{studentInfo.credits} de {studentInfo.totalCredits} créditos</p>
                  <p className="text-2xl font-bold text-green-800 mt-2">{Math.round((studentInfo.credits / studentInfo.totalCredits) * 100)}%</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
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
            </div>
          </div>

          {/* Attendance Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-emerald-500">
            <h2 className="text-xl font-bold text-emerald-700 mb-6 flex items-center">
              📋 Frequência e Participação
            </h2>
            <div className="space-y-6">
            
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-emerald-800">Presença</h3>
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-3xl font-bold text-emerald-800 mb-2">{studentInfo.attendance}%</p>
                <p className="text-sm text-emerald-700">Frequência nas aulas</p>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Dentro do esperado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Grades and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Recent Grades */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-green-700">📝 Notas Recentes</h2>
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="border-2 border-green-100 rounded-xl p-4 hover:border-green-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-green-900 text-sm">{grade.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      grade.score >= 8 ? 'bg-green-100 text-green-800' : 
                      grade.score >= 7 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {grade.score}/10
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-1">{grade.assignment}</p>
                  <p className="text-green-600 text-xs">{grade.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-emerald-500">
            <h2 className="text-xl font-bold text-emerald-700 mb-6 flex items-center">
              ⚡ Ações Rápidas
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-full p-3 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center group relative ${
                  notifications.filter(n => !n.read).length > 0 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                <Bell className="w-4 h-4 mr-2" />
                {notifications.filter(n => !n.read).length > 0 ? 'Notificações Pendentes' : 'Ver Notificações'}
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="ml-2 bg-white text-red-600 text-xs rounded-full px-2 py-1 font-bold animate-bounce">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contato Coordenação
              </button>
              <button 
                onClick={() => setShowEvents(!showEvents)}
                className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Eventos e Agenda
              </button>
              <button 
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Horário de Aulas
              </button>
              <button 
                onClick={() => setShowReports(!showReports)}
                className="w-full p-3 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Relatórios Acadêmicos
              </button>
              <button 
                onClick={() => setShowFinancial(!showFinancial)}
                className="w-full p-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                💰 Financeiro
              </button>
            </div>
          </div>
        </div>

        {/* Important Alerts */}
        <div className="mt-8">
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6 border-l-4 border-l-green-500">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-green-700 mb-2">⚠️ Avisos Importantes</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    • <strong className="text-green-600">Semana de Provas P2:</strong> 25/10 a 01/11/2024
                  </p>
                  <p className="text-sm text-gray-700">
                    • <strong className="text-green-600">Reunião de Pais:</strong> 20/11/2024 às 19h
                  </p>
                  <p className="text-sm text-gray-700">
                    • <strong className="text-green-600">Matrícula 2025.1:</strong> 01 a 15 de dezembro
                  </p>
                  <p className="text-sm text-gray-700">
                    • <strong className="text-amber-600">Mensalidade:</strong> Vence em 05/11/2024
                  </p>
                  <p className="text-sm text-gray-700">
                    • <strong className="text-blue-600">Feira de Ciências:</strong> 15/11/2024 às 14h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-green-600 text-white p-6">
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
                          <p className="text-sm text-gray-700 mb-2">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-emerald-600 text-white p-6">
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
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Events Modal */}
      {showEvents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Eventos e Datas Importantes
                </h2>
                <button
                  onClick={() => setShowEvents(false)}
                  className="text-white hover:text-green-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid gap-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-green-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900 mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Data:</strong> {event.date}</p>
                          <p><strong>Horário:</strong> {event.time}</p>
                          <p><strong>Local:</strong> {event.location}</p>
                          <p className="text-green-700">{event.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'event' ? 'bg-green-100 text-green-800' :
                        event.type === 'meeting' ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {event.type === 'academic' ? 'Acadêmico' :
                         event.type === 'event' ? 'Evento' :
                         event.type === 'meeting' ? 'Reunião' : 'Matrícula'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Modal */}
      {showFinancial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-emerald-700 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  💰 Situação Financeira
                </h2>
                <button
                  onClick={() => setShowFinancial(false)}
                  className="text-white hover:text-emerald-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="border border-emerald-200 rounded-xl p-4">
                  <h3 className="font-semibold text-emerald-900 mb-3">Mensalidade Atual</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="text-xl font-bold text-emerald-800">{financialData.currentMonth.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="font-semibold text-gray-800">{financialData.currentMonth.dueDate}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Pendente - Parcela {financialData.currentMonth.installment}
                    </span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Próxima Mensalidade</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="text-xl font-bold text-gray-800">{financialData.nextMonth.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vencimento</p>
                      <p className="font-semibold text-gray-800">{financialData.nextMonth.dueDate}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Dicas</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Pague até o vencimento para evitar juros</li>
                    <li>• Use o código de barras para pagamento</li>
                    <li>• Entre em contato em caso de dúvidas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Reports Modal */}
      {showReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-green-700 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Relatórios Acadêmicos
                </h2>
                <button
                  onClick={() => setShowReports(false)}
                  className="text-white hover:text-green-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="border border-green-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-green-900 mb-2">📊 Boletim Semestral</h3>
                  <p className="text-sm text-gray-600 mb-3">Relatório completo das notas e frequência</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-all">
                    Visualizar PDF
                  </button>
                </div>
                
                <div className="border border-green-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-green-900 mb-2">📈 Histórico Escolar</h3>
                  <p className="text-sm text-gray-600 mb-3">Registro completo da vida acadêmica</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-all">
                    Baixar Histórico
                  </button>
                </div>
                
                <div className="border border-green-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-green-900 mb-2">🎯 Relatório de Desempenho</h3>
                  <p className="text-sm text-gray-600 mb-3">Análise detalhada do progresso acadêmico</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-all">
                    Gerar Relatório
                  </button>
                </div>
                
                <div className="border border-green-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
                  <h3 className="font-semibold text-green-900 mb-2">📅 Registro de Frequência</h3>
                  <p className="text-sm text-gray-600 mb-3">Detalhamento de presenças e faltas</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-all">
                    Ver Frequência
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-emerald-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Horário de Aulas - {studentInfo.semester}
                </h2>
                <button
                  onClick={() => setShowSchedule(false)}
                  className="text-white hover:text-emerald-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border border-emerald-200 rounded-lg">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Horário</th>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Segunda</th>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Terça</th>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Quarta</th>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Quinta</th>
                      <th className="border border-emerald-200 p-3 text-left font-semibold text-emerald-800">Sexta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-emerald-200 p-3 font-medium bg-emerald-50">08:00-09:40</td>
                      <td className="border border-emerald-200 p-3">Algoritmos<br/><span className="text-xs text-gray-600">Sala 101</span></td>
                      <td className="border border-emerald-200 p-3">Cálculo II<br/><span className="text-xs text-gray-600">Sala 205</span></td>
                      <td className="border border-emerald-200 p-3">Física II<br/><span className="text-xs text-gray-600">Lab 301</span></td>
                      <td className="border border-emerald-200 p-3">Algoritmos<br/><span className="text-xs text-gray-600">Sala 101</span></td>
                      <td className="border border-emerald-200 p-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-emerald-200 p-3 font-medium bg-emerald-50">10:00-11:40</td>
                      <td className="border border-emerald-200 p-3">Banco de Dados<br/><span className="text-xs text-gray-600">Lab 102</span></td>
                      <td className="border border-emerald-200 p-3">Física II<br/><span className="text-xs text-gray-600">Lab 301</span></td>
                      <td className="border border-emerald-200 p-3">Cálculo II<br/><span className="text-xs text-gray-600">Sala 205</span></td>
                      <td className="border border-emerald-200 p-3">Banco de Dados<br/><span className="text-xs text-gray-600">Lab 102</span></td>
                      <td className="border border-emerald-200 p-3">-</td>
                    </tr>
                    <tr>
                      <td className="border border-emerald-200 p-3 font-medium bg-emerald-50">14:00-15:40</td>
                      <td className="border border-emerald-200 p-3">Engenharia Software<br/><span className="text-xs text-gray-600">Sala 103</span></td>
                      <td className="border border-emerald-200 p-3">-</td>
                      <td className="border border-emerald-200 p-3">Engenharia Software<br/><span className="text-xs text-gray-600">Sala 103</span></td>
                      <td className="border border-emerald-200 p-3">-</td>
                      <td className="border border-emerald-200 p-3">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">📚 Observações</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Laboratórios requerem jaleco e equipamentos de proteção</li>
                  <li>• Chegadas após 10 minutos são consideradas falta</li>
                  <li>• Consulte o professor em caso de mudanças no horário</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianDashboard;
