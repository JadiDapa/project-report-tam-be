import { Reports } from './reports';
import { Roles } from './roles';

export interface Features {
  id: number;
  name: string;
  description: string;
  FeatRolesures: Roles[];
  Accounts: Reports[];
  createdAt: Date;
  updatedAt: Date;
}
