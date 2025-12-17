
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  avatar: string;
}

export type AccountStatus = 'active' | 'banned' | 'locked' | 'cooldown';
export type MarketStatus = 'for_sale' | 'sold' | 'reserved' | 'private';

export interface RobloxAccount {
  id: string;
  username: string;
  password?: string;
  cookie?: string;
  robux: number;
  premium: boolean;
  status: AccountStatus;
  marketStatus: MarketStatus;
  price: number;
  lastChecked: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
}
