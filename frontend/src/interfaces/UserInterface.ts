// Samuel Moncada
// main interface
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
