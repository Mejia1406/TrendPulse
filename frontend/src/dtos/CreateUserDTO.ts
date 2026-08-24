import type { UserInterface } from "../interfaces/UserInterface";

export interface CreateUserDTO extends Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'> {}