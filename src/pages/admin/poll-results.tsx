import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Poll } from '@/types';

const PollResults: NextPage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  // Simular carregamento de enquetes
  useEffect(() => {
    // Aqui será implementada a chamada à API
    const mockPolls: Poll[] = [
      {
        id: '1',
        title: 'Horário da Palestra',
        description: 'Escolha o melhor horário para a palestra',
        startDate: new Date(),
        endDate: new Date(),
        category: 'Palestras',
        options: [
          { id: '1', text: '14:00', votes: 10 },
          { id: '2', text: '15:00', votes: 15 },
          { id: '3', text: '16:00', votes: 5 }
        ],
        createdBy: 'admin@adm.unasp.br'
      }
    ];
    setPolls(mockPolls);
  }, []);

  const calculatePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((acc, option) => acc + option.votes, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Resultados das Enquetes
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {poll.title}
              </h2>
              <p className="text-gray-600 mb-4">{poll.description}</p>
              
              <div className="space-y-4">
                {poll.options.map((option) => {
                  const percentage = calculatePercentage(option.votes, getTotalVotes(poll));
                  
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>{option.text}</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {option.votes} votos
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Total de votos: {getTotalVotes(poll)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollResults;
