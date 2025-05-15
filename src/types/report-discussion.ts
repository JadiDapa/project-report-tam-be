import { ReportDiscussions } from '@prisma/client';
import { Accounts } from './accounts';
import { Reports } from './reports';

export interface ReportDiscussion {
  id: number;
  content: string;
  reportId: number;
  Report: Reports;
  accountId: number;
  Account: Accounts;
  mainContentId?: number;
  mainContent?: ReportDiscussions;
  Replies: ReportDiscussions[];
  createdAt: Date;
  updatedAt: Date;
}
