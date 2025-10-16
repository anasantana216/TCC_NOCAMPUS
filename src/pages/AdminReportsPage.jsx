import React, { useState, useEffect } from 'react';
import { FileText, Download, Filter, Calendar, BarChart3, Users, TrendingUp, Eye, PieChart, Activity } from 'lucide-react';
import LogoutButton from '../components/LogoutButton';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [reportType, setReportType] = useState('all');

  // Dados simulados de relatórios
  const mockReports = [
    {
      id: 1,
      title: "Relatório de Participação em Eventos",
      type: "events",
      period: "monthly",
      date: "2024-10-01",
      description: "Análise detalhada da participação estudantil nos eventos do mês",
      metrics: {
        totalEvents: 15,
        totalParticipants: 342,
        averageParticipation: 22.8,
        mostPopularEvent: "Semana de Tecnologia"
      }
    },
    {
      id: 2,
      title: "Relatório de Enquetes e Feedback",
      type: "polls",
      period: "monthly",
      date: "2024-10-01",
      description: "Compilação de respostas e análise de satisfação da comunidade",
      metrics: {
        totalPolls: 8,
        totalResponses: 156,
        responseRate: 68.4,
        satisfactionScore: 4.2
      }
    },
    {
      id: 3,
      title: "Relatório de Engajamento Geral",
      type: "engagement",
      period: "monthly",
      date: "2024-10-01",
      description: "Métricas gerais de uso da plataforma e engajamento",
      metrics: {
        activeUsers: 89,
        loginFrequency: 3.5,
        platformUsage: 85.2,
        newRegistrations: 12
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, reportType]);

  const generateReport = (type) => {
    setLoading(true);
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        title: `Novo Relatório - ${type}`,
        type: type,
        period: selectedPeriod,
        date: new Date().toISOString().split('T')[0],
        description: `Relatório gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}`,
        metrics: {
          totalItems: Math.floor(Math.random() * 50) + 10,
          totalUsers: Math.floor(Math.random() * 200) + 50,
          engagement: (Math.random() * 30 + 70).toFixed(1),
          growth: (Math.random() * 20 + 5).toFixed(1)
        }
      };
      setReports([newReport, ...reports]);
      setLoading(false);
    }, 2000);
  };

  const downloadReport = (reportId) => {
    // Simular download
    const report = reports.find(r => r.id === reportId);
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${report.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'events': return <Calendar className="w-5 h-5" />;
      case 'polls': return <BarChart3 className="w-5 h-5" />;
      case 'engagement': return <TrendingUp className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getReportColor = (type) => {
    switch (type) {
      case 'events': return 'blue';
      case 'polls': return 'slate';
      case 'engagement': return 'blue';
      default: return 'slate';
    }
  };

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-900 border-r-slate-500 mx-auto mb-4"></div>
          <p className="text-slate-700 font-semibold text-lg">Carregando relatórios...</p>
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
              <span className="bg-gradient-to-r from-blue-900 to-slate-800 bg-clip-text text-transparent font-semibold">Relatórios</span>
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
            { label: 'Relatórios', href: null }
          ]} 
        />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-2">
                📊 Relatórios e Analytics
              </h1>
              <p className="text-slate-700 text-lg">
                Analise dados e gere relatórios detalhados da plataforma UNASP
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Relatórios Gerados</p>
                <p className="text-3xl font-bold text-blue-900">{reports.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-blue-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm font-medium">Período Atual</p>
                <p className="text-3xl font-bold text-slate-800">Out/24</p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl">
                <Calendar className="w-8 h-8 text-slate-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Dados Processados</p>
                <p className="text-3xl font-bold text-blue-900">1.2k</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <Activity className="w-8 h-8 text-blue-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm font-medium">Precisão</p>
                <p className="text-3xl font-bold text-slate-800">98.5%</p>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-blue-200/30">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Gerar Novo Relatório</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Período</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
                <option value="quarterly">Trimestral</option>
                <option value="yearly">Anual</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Relatório</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Geral</option>
                <option value="events">Eventos</option>
                <option value="polls">Enquetes</option>
                <option value="engagement">Engajamento</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => generateReport(reportType)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-white mr-2"></div>
                ) : (
                  <PieChart className="w-5 h-5 mr-2" />
                )}
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-200/30">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Relatórios Disponíveis</h2>
          
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Nenhum relatório encontrado</p>
              <p className="text-slate-500 text-sm">Gere seu primeiro relatório usando os controles acima</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`bg-gradient-to-br from-${getReportColor(report.type)}-100 to-${getReportColor(report.type)}-200 p-2 rounded-lg`}>
                          {getReportIcon(report.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-900">{report.title}</h3>
                          <p className="text-sm text-slate-600">
                            {new Date(report.date).toLocaleDateString('pt-BR')} • {report.period}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-700 mb-4">{report.description}</p>
                      
                      {/* Metrics Preview */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(report.metrics).map(([key, value]) => (
                          <div key={key} className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase tracking-wide">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-lg font-bold text-slate-800">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors duration-200">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => downloadReport(report.id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;