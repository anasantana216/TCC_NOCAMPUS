import { Poll, PollOption } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const pollService = {
  // Criar nova enquete
  async createPoll(pollData: Omit<Poll, 'id'>): Promise<Poll> {
    const response = await fetch(`${API_URL}/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pollData),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar enquete');
    }

    return response.json();
  },

  // Buscar todas as enquetes
  async getPolls(): Promise<Poll[]> {
    const response = await fetch(`${API_URL}/polls`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar enquetes');
    }

    return response.json();
  },

  // Buscar uma enquete específica
  async getPoll(id: string): Promise<Poll> {
    const response = await fetch(`${API_URL}/polls/${id}`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar enquete');
    }

    return response.json();
  },

  // Votar em uma opção
  async vote(pollId: string, optionId: string): Promise<PollOption> {
    const response = await fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ optionId }),
    });

    if (!response.ok) {
      throw new Error('Falha ao registrar voto');
    }

    return response.json();
  },

  // Buscar resultados de uma enquete
  async getPollResults(id: string): Promise<Poll> {
    const response = await fetch(`${API_URL}/polls/${id}/results`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar resultados');
    }

    return response.json();
  },
};
