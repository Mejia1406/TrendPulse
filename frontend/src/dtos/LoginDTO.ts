// Athina Cappelletti

// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export type LoginDTO = Pick<UserInterface, 'email' | 'password'>;
