// Samuel Moncada Mejía

// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export const userSeeder: UserInterface[] = [
  {
    id: '1',
    name: 'Samuel Moncada',
    email: 'smoncadam@eafit.edu.co',
    password: '123456',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sara Hurtado',
    email: 'shurtadom3@eafit.edu.co',
    password: '123456',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Athina Cappelletti',
    email: 'aacappellg@eafit.edu.co',
    password: '123456',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
