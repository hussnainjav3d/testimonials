export type Role = 'EDITOR' | 'READER' | 'MANAGER' | 'SUPER_USER';

export interface User {
  name: string;
  email: string;
  role: Role;
}
