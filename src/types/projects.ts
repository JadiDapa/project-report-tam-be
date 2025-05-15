import { ProjectAssignments } from './project-assignments';
import { Reports } from './reports';

export interface Projects {
  id: number;
  title: string;
  description?: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  Reports: Reports[];
  Employees: ProjectAssignments[];
}
