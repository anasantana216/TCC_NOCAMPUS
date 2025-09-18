export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  category: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  duration?: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  options: PollOption[];
  responses: PollResponse[];
}

export interface PollOption {
  id: string;
  pollId: string;
  text: string;
  date?: Date;
  time?: string;
  order: number;
}

export interface PollResponse {
  id: string;
  pollId: string;
  userId: string;
  optionId: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  location?: string;
  category: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'STUDENT' | 'ADMIN';

export interface AuthUser extends User {
  accessToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface PollCreateData {
  title: string;
  description?: string;
  category: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  duration?: number;
  options: Omit<PollOption, 'id' | 'pollId'>[];
}