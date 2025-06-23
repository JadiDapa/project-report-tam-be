import { Router } from 'express';
import {
  handleGetAllReports,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
  handleGetReportById
} from '../controllers/controller.report';
import upload from '../middleware/file-upload.middleware';

const ReportRouter = Router();

ReportRouter.get('/reports', handleGetAllReports);
ReportRouter.get('/reports/:reportId', handleGetReportById);
ReportRouter.post('/reports', upload.array('ReportEvidences'), handleCreateReport);
ReportRouter.put(
  '/reports/:reportId',

  upload.array('ReportEvidences'),
  handleUpdateReport
);
ReportRouter.delete('/reports/:reportId', handleDeleteReport);

export default ReportRouter;
