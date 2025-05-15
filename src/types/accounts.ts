import { ProjectAssignments } from './project-assignments';
import { Reports } from './reports';

export interface Accounts {
  id: number;
  fullname: string;
  email: string;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  Reports: Reports[];
  Projects: ProjectAssignments[];
}
