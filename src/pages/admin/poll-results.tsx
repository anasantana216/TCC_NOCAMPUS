import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Poll } from '@/types';

const PollResults: NextPage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Simular carregamento de enquetes
  useEffect(() => {
    // Aqui será implementada a chamada à API
    const mockPolls: Poll[] = [
      {
        id: '1',
        title: 'Horário da Palestra',
        description: 'Escolha o melhor horário para a palestra',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-25'),
        category: 'Palestras',
        options: [
          { id: '1', text: '14:00', votes: 10 },
          { id: '2', text: '15:00', votes: 15 },
          { id: '3', text: '16:00', votes: 5 }
        ],
        createdBy: 'admin@adm.unasp.br'
      },
      {
        id: '2',
        title: 'Local do Evento de Formatura',
        description: 'Onde deve acontecer a cerimônia?',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-02-01'),
        category: 'Eventos',
        options: [
          { id: '1', text: 'Auditório Principal', votes: 25 },
          { id: '2', text: 'Ginásio', votes: 18 },
          { id: '3', text: 'Área Externa', votes: 7 }
        ],
        createdBy: 'admin@adm.unasp.br'
      },
      {
        id: '3',
        title: 'Cardápio da Semana',
        description: 'Qual prato preferem para segunda-feira?',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-15'),
        category: 'Alimentação',
        options: [
          { id: '1', text: 'Lasanha', votes: 42 },
          { id: '2', text: 'Strogonoff', votes: 38 },
          { id: '3', text: 'Feijoada', votes: 30 }
        ],
        createdBy: 'admin@adm.unasp.br'
      }
    ];
    setPolls(mockPolls);
    setFilteredPolls(mockPolls);
  }, []);

  useEffect(() => {
    let filtered = polls;
    const now = new Date();
    
    if (filter === 'active') {
      filtered = polls.filter(poll => new Date(poll.endDate) > now);
    } else if (filter === 'finished') {
      filtered = polls.filter(poll => new Date(poll.endDate) <= now);
    }
    
    setFilteredPolls(filtered);
  }, [polls, filter]);

  const calculatePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((acc, option) => acc + option.votes, 0);
  };

  const getStatusColor = (poll: Poll) => {
    const now = new Date();
    return new Date(poll.endDate) > now ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800';
  };

  const getStatusText = (poll: Poll) => {
    const now = new Date();
    return new Date(poll.endDate) > now ? 'Ativa' : 'Finalizada';
  };

  const handleDeletePoll = (pollId: string) => {
    setPolls(polls.filter(poll => poll.id !== pollId));
    setShowDeleteConfirm(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Gerenciar Resultados das Enquetes
          </h1>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'finished')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="all">Todas as Enquetes</option>
              <option value="active">Enquetes Ativas</option>
              <option value="finished">Enquetes Finalizadas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPolls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-slate-800 flex-1">
                  {poll.title}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poll)}`}>
                  {getStatusText(poll)}
                </span>
              </div>
              
              <p className="text-slate-600 mb-4">{poll.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>Início: {formatDate(poll.startDate)}</span>
                  <span>Fim: {formatDate(poll.endDate)}</span>
                </div>
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {poll.category}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                {poll.options.map((option) => {
                  const percentage = calculatePercentage(option.votes, getTotalVotes(poll));
                  
                  return (
                    <div key={option.id} className="space-y-1">
                      <div className="flex justify-between text-sm font-medium text-slate-700">
                        <span>{option.text}</span>
                        <span>{percentage}% ({option.votes} votos)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                    Total: {getTotalVotes(poll)} votos
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedPoll(poll)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Detalhes
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(poll.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPolls.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Nenhuma enquete encontrada
            </h3>
            <p className="text-slate-500">
              {filter === 'active' ? 'Não há enquetes ativas no momento.' :
               filter === 'finished' ? 'Não há enquetes finalizadas.' :
               'Não há enquetes cadastradas.'}
            </p>
          </div>
        )}

        {/* Modal de Detalhes */}
        {selectedPoll && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedPoll.title}
                  </h2>
                  <button
                    onClick={() => setSelectedPoll(null)}
                    className="text-slate-400 hover:text-slate-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Data de Início
                    </label>
                    <p className="text-slate-900">{formatDate(selectedPoll.startDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Data de Término
                    </label>
                    <p className="text-slate-900">{formatDate(selectedPoll.endDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Categoria
                    </label>
                    <p className="text-slate-900">{selectedPoll.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPoll)}`}>
                      {getStatusText(selectedPoll)}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição
                  </label>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded">
                    {selectedPoll.description}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Resultados Detalhados
                  </label>
                  <div className="space-y-4">
                    {selectedPoll.options.map((option, index) => {
                      const percentage = calculatePercentage(option.votes, getTotalVotes(selectedPoll));
                      
                      return (
                        <div key={option.id} className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-900">
                              Opção {index + 1}: {option.text}
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-slate-600">
                            {option.votes} votos de {getTotalVotes(selectedPoll)} total
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-900">Total de Participantes</p>
                      <p className="text-2xl font-bold text-blue-600">{getTotalVotes(selectedPoll)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Criado por</p>
                      <p className="font-medium text-slate-900">{selectedPoll.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Exclusão */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Confirmar Exclusão
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Tem certeza que deseja excluir esta enquete? Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDeletePoll(showDeleteConfirm)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollResults;
