// Samuel Moncada Mejía
// internal imports
import type { UserInterface } from "../interfaces/UserInterface";

export interface CreateUserDTO extends Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'> {}