import { Reports } from './reports';

export interface ReportEvidences {
  id: number;
  image: string;
  description?: string;
  reportId: number;
  Report: Reports;
  createdAt: Date;
  updatedAt: Date;
}
