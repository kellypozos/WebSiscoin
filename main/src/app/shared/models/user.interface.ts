export type Roles = 'EDITOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  role?: Roles;
}
