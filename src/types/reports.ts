import { ReportEvidences } from '@prisma/client';
import { Accounts } from './accounts';
import { Projects } from './projects';

export interface Reports {
  id: number;
  title: string;
  description?: string;
  serialNumber: string;
  location: string;
  projectId: number;
  Project: Projects;
  accountId: number;
  Account: Accounts;
  createdAt: Date;
  updatedAt: Date;
  ReportEvidences: ReportEvidences[];
}
