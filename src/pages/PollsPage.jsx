import React, { useState, useEffect } from 'react';
import { BarChart3, Users, CheckCircle, Plus, TrendingUp, MessageSquare } from 'lucide-react';
import { pollsAPI } from '../services/api';

const PollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votedPolls, setVotedPolls] = useState(new Set());

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const response = await pollsAPI.getAll();
      setPolls(response.data);
    } catch (err) {
      console.error('Erro ao carregar enquetes:', err);
      setError('Erro ao carregar enquetes. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionId) => {
    if (votedPolls.has(pollId)) return;

    try {
      // Simular voto (aqui você implementaria a API de voto real)
      setVotedPolls(prev => new Set([...prev, pollId]));
      
      // Atualizar os votos localmente
      setPolls(prev => prev.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map(option => 
              option.id === optionId 
                ? { ...option, votes: option.votes + 1 }
                : option
            )
          };
        }
        return poll;
      }));

      // Aqui você faria a chamada real para a API:
      // await pollsAPI.vote(pollId, optionId);
    } catch (err) {
      console.error('Erro ao votar:', err);
      setVotedPolls(prev => {
        const newSet = new Set(prev);
        newSet.delete(pollId);
        return newSet;
      });
    }
  };

  const calculatePercentage = (votes, totalVotes) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  const getTotalVotes = (poll) => {
    return poll.options ? poll.options.reduce((sum, option) => sum + option.votes, 0) : 0;
  };

  const getHighestVotedOption = (poll) => {
    if (!poll.options || poll.options.length === 0) return null;
    return poll.options.reduce((highest, option) => 
      option.votes > highest.votes ? option : highest
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando enquetes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Enquetes da Comunidade</h1>
          <p className="text-gray-600 mt-2">Participe e veja a opinião da comunidade UNASP EC</p>
        </div>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          onClick={() => alert('Funcionalidade em desenvolvimento')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Criar Enquete
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      {polls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">{polls.length}</div>
                <div className="text-gray-600">Enquetes Ativas</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">
                  {polls.reduce((sum, poll) => sum + getTotalVotes(poll), 0)}
                </div>
                <div className="text-gray-600">Total de Votos</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">{votedPolls.size}</div>
                <div className="text-gray-600">Suas Participações</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.round((votedPolls.size / Math.max(polls.length, 1)) * 100)}%
                </div>
                <div className="text-gray-600">Participação</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Polls List */}
      {polls.length > 0 ? (
        <div className="space-y-6">
          {polls.map((poll) => {
            const totalVotes = getTotalVotes(poll);
            const hasVoted = votedPolls.has(poll.id);
            const winningOption = getHighestVotedOption(poll);

            return (
              <div key={poll.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{poll.title}</h3>
                    {poll.description && (
                      <p className="text-gray-600 mb-4">{poll.description}</p>
                    )}
                  </div>
                  
                  {hasVoted && (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Votado</span>
                    </div>
                  )}
                </div>

                {/* Poll Options */}
                <div className="space-y-3">
                  {poll.options && poll.options.map((option) => {
                    const percentage = calculatePercentage(option.votes, totalVotes);
                    const isWinning = winningOption && option.id === winningOption.id && totalVotes > 0;
                    
                    return (
                      <div key={option.id}>
                        <button
                          onClick={() => handleVote(poll.id, option.id)}
                          disabled={hasVoted}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            hasVoted
                              ? 'cursor-not-allowed bg-gray-50 border-gray-200'
                              : 'cursor-pointer hover:border-green-500 border-gray-200 hover:bg-green-50'
                          } ${isWinning ? 'ring-2 ring-green-500' : ''}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className={`font-medium ${
                              isWinning ? 'text-green-700' : 'text-gray-800'
                            }`}>
                              {option.text}
                            </span>
                            <div className="flex items-center space-x-2">
                              {isWinning && <TrendingUp className="w-4 h-4 text-green-500" />}
                              <span className={`text-sm font-bold ${
                                isWinning ? 'text-green-700' : 'text-gray-600'
                              }`}>
                                {percentage}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isWinning ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Users className="w-3 h-3 mr-1" />
                              {option.votes}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Poll Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'}
                    </div>
                    <div className="text-right">
                      {hasVoted ? (
                        <span className="text-green-600 font-medium">Obrigado por participar!</span>
                      ) : (
                        <span>Clique em uma opção para votar</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma enquete disponível</h3>
          <p className="text-gray-500">Novas enquetes serão publicadas em breve.</p>
        </div>
      )}
    </div>
  );
};

export default PollsPage;