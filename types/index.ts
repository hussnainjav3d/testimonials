export type Role = 'EDITOR' | 'READER' | 'MANAGER';

export interface User {
  name: string;
  email: string;
  role: Role;
}
