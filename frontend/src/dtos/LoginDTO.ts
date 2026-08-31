// Athina Cappelletti
// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export interface LoginDTO
  extends Pick<UserInterface, 'email' | 'password'> {}