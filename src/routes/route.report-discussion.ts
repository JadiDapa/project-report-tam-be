import { Router } from 'express';
import {
  handleGetAllReportDiscussions,
  handleCreateReportDiscussion,
  handleUpdateReportDiscussion,
  handleDeleteReportDiscussion,
  handleGetReportDiscussionById,
  handleGetReportDiscussionsByReportId
} from '../controllers/controller.report-discussion';

const ReportDiscussionRouter = Router();

ReportDiscussionRouter.get('/report-discussions', handleGetAllReportDiscussions);
ReportDiscussionRouter.get(
  '/report-discussions/report/:reportId',
  handleGetReportDiscussionsByReportId
);
ReportDiscussionRouter.get('/report-discussions/:discussionId', handleGetReportDiscussionById);
ReportDiscussionRouter.post('/report-discussions', handleCreateReportDiscussion);
ReportDiscussionRouter.put('/report-discussions/:discussionId', handleUpdateReportDiscussion);
ReportDiscussionRouter.delete('/report-discussions/:discussionId', handleDeleteReportDiscussion);

export default ReportDiscussionRouter;
