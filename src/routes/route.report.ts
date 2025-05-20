import { Router } from 'express';
import {
  handleGetAllReports,
  handleCreateReport,
  handleUpdateReport,
  handleDeleteReport,
  handleGetReportById
} from '../controllers/controller.report';
import { verifyToken } from '../middleware/verify-token';
import upload from '../middleware/file-upload.middleware';

const ReportRouter = Router();

ReportRouter.get('/reports', verifyToken, handleGetAllReports);
ReportRouter.get('/reports/:reportId', verifyToken, handleGetReportById);
ReportRouter.post('/reports', verifyToken, upload.array('ReportEvidences'), handleCreateReport);
ReportRouter.put(
  '/reports/:reportId',
  verifyToken,
  upload.array('ReportEvidences'),
  handleUpdateReport
);
ReportRouter.delete('/reports/:reportId', verifyToken, handleDeleteReport);

export default ReportRouter;
