// Samuel Moncada Mejía
// internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/UserStore';

export class UserService {
  static getAll(): UserInterface[] {
    return useUserStore().users;
  }

  static create(user: CreateUserDTO): void {
    const store = useUserStore();
    const nextId =
      store.users.length > 0
        ? (
            Math.max(...store.users.map((existingUser) => parseInt(existingUser.id)), 0) + 1
          ).toString()
        : '1';
    store.users.push({
      id: nextId,
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static update(id: string, updateUser: CreateUserDTO): void {
    const store = useUserStore();
    const index = store.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return;
    }

    const existingUser = store.users[index];
    if (!existingUser) {
      return;
    }

    store.users[index] = {
      ...existingUser,
      ...updateUser,
      updatedAt: new Date().toISOString(),
    };
  }

  static delete(id: string): void {
    const store = useUserStore();
    const index = store.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return;
    }
    store.users.splice(index, 1);
  }
}
