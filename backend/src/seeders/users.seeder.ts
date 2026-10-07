// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import * as bcrypt from 'bcrypt';

// internal imports
import type { UsersService } from '../users/users.service.js';

export async function seedUsers(usersService: UsersService): Promise<void> {
  const passwordHash = await bcrypt.hash('123456', 10);

  const users = [
    {
      name: 'Samuel Moncada',
      email: 'smoncadam@eafit.edu.co',
      password: passwordHash,
      role: 'admin' as const,
    },
    {
      name: 'Sara Hurtado',
      email: 'shurtadom3@eafit.edu.co',
      password: passwordHash,
      role: 'user' as const,
    },
    {
      name: 'Athina Cappelletti',
      email: 'aacappellg@eafit.edu.co',
      password: passwordHash,
      role: 'user' as const,
    },
  ];

  for (const user of users) {
    const existing = await usersService.findByEmail(user.email);

    if (!existing) {
      await usersService.create(user);
    }
  }
}
