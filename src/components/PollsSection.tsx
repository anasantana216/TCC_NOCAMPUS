import { useState } from 'react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  options: PollOption[];
  userVoted: boolean;
}

interface PollsSectionProps {
  polls: Poll[];
}

const PollsSection: React.FC<PollsSectionProps> = ({ polls }) => {
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<{ [pollId: string]: string }>({});

  const handleVote = (pollId: string, optionId: string) => {
    // Simular votação
    setVotedPolls(prev => {
      const newSet = new Set(prev);
      newSet.add(pollId);
      return newSet;
    });
    setSelectedOptions(prev => ({ ...prev, [pollId]: optionId }));
    
    // Aqui seria feita a chamada à API
    console.log(`Votando na enquete ${pollId}, opção ${optionId}`);
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const isExpired = (endDate: Date) => {
    return new Date() > endDate;
  };

  const getDaysLeft = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (polls.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗳️</span>
        </div>
        <p className="text-gray-500">Nenhuma enquete ativa no momento</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {polls.map((poll) => {
        const hasVoted = poll.userVoted || votedPolls.has(poll.id);
        const expired = isExpired(poll.endDate);
        const daysLeft = getDaysLeft(poll.endDate);
        const totalVotes = getTotalVotes(poll);

        return (
          <div
            key={poll.id}
            className={`
              border rounded-lg p-4 transition-all
              ${hasVoted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}
              ${expired ? 'opacity-60' : 'hover:shadow-md'}
            `}
          >
            {/* Poll Header */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">{poll.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{poll.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`
                  px-2 py-1 rounded-full font-medium
                  ${expired ? 'bg-red-100 text-red-600' : 
                    daysLeft <= 1 ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-blue-100 text-blue-600'}
                `}>
                  {expired ? 'Expirada' : 
                   daysLeft === 0 ? 'Expira hoje' :
                   daysLeft === 1 ? 'Expira amanhã' :
                   `${daysLeft} dias restantes`}
                </span>
                
                {hasVoted && (
                  <span className="text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Votado
                  </span>
                )}
              </div>
            </div>

            {/* Poll Options */}
            <div className="space-y-2">
              {poll.options.map((option) => {
                const percentage = getPercentage(option.votes, totalVotes);
                const isSelected = selectedOptions[poll.id] === option.id;

                return (
                  <div key={option.id} className="relative">
                    {hasVoted || expired ? (
                      // Results view
                      <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${isSelected ? 'font-semibold text-secondary' : 'text-gray-700'}`}>
                            {option.text} {isSelected && '✓'}
                          </span>
                          <span className="text-sm font-medium text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isSelected ? 'bg-secondary' : 'bg-primary'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-1 text-xs text-gray-500">
                          {option.votes} votos
                        </div>
                      </div>
                    ) : (
                      // Voting view
                      <button
                        onClick={() => handleVote(poll.id, option.id)}
                        className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-secondary hover:bg-secondary-light hover:bg-opacity-10 transition-all"
                      >
                        <span className="text-sm text-gray-700">{option.text}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total votes */}
            {(hasVoted || expired) && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Total: {totalVotes} votos
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* View All Polls Link */}
      <div className="text-center pt-4">
        <button className="text-secondary hover:text-secondary-dark font-medium text-sm transition-colors">
          Ver todas as enquetes →
        </button>
      </div>
    </div>
  );
};

export default PollsSection;