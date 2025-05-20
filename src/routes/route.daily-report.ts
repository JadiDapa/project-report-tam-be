import { Router } from 'express';
import {
  handleGetAllDailyReports,
  handleCreateDailyReport,
  handleUpdateDailyReport,
  handleDeleteDailyReport,
  handleGetDailyReportById,
  handleGetDailyReportsByAccountId
} from '../controllers/controller.daily-report';
import upload from '../middleware/file-upload.middleware';

const DailyReportRouter = Router();

DailyReportRouter.get('/daily-reports', handleGetAllDailyReports);
DailyReportRouter.get('/daily-reports/account/:accountId', handleGetDailyReportsByAccountId);
DailyReportRouter.get('/daily-reports/:dailyReportId', handleGetDailyReportById);
DailyReportRouter.post('/daily-reports', upload.array('ReportEvidences'), handleCreateDailyReport);
DailyReportRouter.put(
  '/daily-reports/:dailyReportId',
  upload.array('ReportEvidences'),
  handleUpdateDailyReport
);
DailyReportRouter.delete('/daily-reports/:dailyReportId', handleDeleteDailyReport);

export default DailyReportRouter;
