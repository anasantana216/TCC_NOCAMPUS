// Tipo para usuário
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'coordinator';
}

// Tipo para enquete
export interface Poll {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  location?: string;
  options: PollOption[];
  createdBy: string;
}

// Tipo para opção de enquete
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

// Tipo para evento
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  organizer: string;
}
