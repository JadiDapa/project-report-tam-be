import { Router } from 'express';
import {
  handleGetAllDailyReports,
  handleCreateDailyReport,
  handleUpdateDailyReport,
  handleDeleteDailyReport,
  handleGetDailyReportById,
  handleGetDailyReportsByAccountId,
  handleGenerateDailyReport
} from '../controllers/controller.daily-report';
import upload from '../middleware/file-upload.middleware';

const DailyReportRouter = Router();

DailyReportRouter.get('/daily-reports', handleGetAllDailyReports);
DailyReportRouter.get('/daily-reports/account/:accountId', handleGetDailyReportsByAccountId);
DailyReportRouter.get('/daily-reports/:dailyReportId', handleGetDailyReportById);
DailyReportRouter.get('/daily-reports/generate-report/:date', handleGenerateDailyReport);
DailyReportRouter.post(
  '/daily-reports',
  upload.array('DailyReportEvidences'),
  handleCreateDailyReport
);
DailyReportRouter.put(
  '/daily-reports/:dailyReportId',
  upload.array('DailyReportEvidences'),
  handleUpdateDailyReport
);
DailyReportRouter.delete('/daily-reports/:dailyReportId', handleDeleteDailyReport);

export default DailyReportRouter;
