import { Features } from '@prisma/client';
import { Reports } from './reports';

export interface Roles {
  id: number;
  name: string;
  description: string;
  Features?: Features[];
  Accounts?: Reports[];
  createdAt: Date;
  updatedAt: Date;
}
