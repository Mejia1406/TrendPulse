// Samuel Moncada
// internal imports
import api from '@/services/apiClient';

import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { UpdateUserDTO } from '@/dtos/UpdateUserDTO';

export class UserService {
  static async getAll(): Promise<UserInterface[]> {
    const { data } = await api.get<UserInterface[]>('/users');

    return data;
  }

  static async create(user: CreateUserDTO): Promise<UserInterface> {
    const { data } = await api.post<UserInterface>('/users', user);

    return data;
  }

  static async update(id: number, updateUser: UpdateUserDTO): Promise<UserInterface | null> {
    const { data } = await api.patch<UserInterface | null>(`/users/${id}`, updateUser);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}
