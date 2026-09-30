// Samuel Moncada

// external imports
import axios from 'axios';

// internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { UpdateUserDTO } from '@/dtos/UpdateUserDTO';

export class UserService {
  private static readonly API_URL = 'http://localhost:3000/api/users';

  static async getAll(): Promise<UserInterface[]> {
    const { data } = await axios.get<UserInterface[]>(this.API_URL);

    return data;
  }

  static async create(user: CreateUserDTO): Promise<UserInterface> {
    const { data } = await axios.post<UserInterface>(this.API_URL, user);

    return data;
  }

  static async update(id: number, updateUser: UpdateUserDTO): Promise<UserInterface | null> {
    const { data } = await axios.patch<UserInterface | null>(`${this.API_URL}/${id}`, updateUser);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`);
  }
}
