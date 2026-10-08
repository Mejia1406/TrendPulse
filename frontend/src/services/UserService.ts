// Samuel Moncada
// internal imports
import { BaseService } from '@/services/BaseService';

import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { UpdateUserDTO } from '@/dtos/UpdateUserDTO';

export class UserService extends BaseService {
  static async getAll(): Promise<UserInterface[]> {
    return await this.httpGet('/users');
  }

  static async create(user: CreateUserDTO): Promise<UserInterface> {
    return await this.httpPost('/users', user);
  }

  static async update(id: number, updateUser: UpdateUserDTO): Promise<UserInterface | null> {
    return await this.httpPatch(`/users/${id}`, updateUser);
  }

  static async delete(id: number): Promise<void> {
    await this.httpDelete(`/users/${id}`);
  }
}
