// Athina Cappelletti
import type { UserInterface } from '@/interfaces/UserInterface';

export interface LoginDTO
  extends Pick<UserInterface, 'email' | 'password'> {}