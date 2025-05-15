import {
  getAllReportDiscussions,
  getReportDiscussionById,
  createReportDiscussion,
  updateReportDiscussion,
  deleteReportDiscussion,
  getReportDiscussionsByReportId
} from '../models/model.report-discussion';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { ReportDiscussion } from '../types/report-discussion';
import { io } from '../index';

export const handleGetAllReportDiscussions = async (req: any, res: any) => {
  try {
    const result = await getAllReportDiscussions();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetReportDiscussionsByReportId = async (req: any, res: any) => {
  try {
    const reportId = req.params.reportId;
    const result = await getReportDiscussionsByReportId(reportId);
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetReportDiscussionById = async (
  req: { params: { discussionId: string } },
  res: any
) => {
  try {
    const discussionId = req.params.discussionId;
    const result = await getReportDiscussionById(discussionId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateReportDiscussion = async (req: { body: ReportDiscussion }, res: any) => {
  try {
    const data = req.body;
    const result = await createReportDiscussion(data);
    io.emit('discussion', result);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateReportDiscussion = async (
  req: { params: { discussionId: string }; body: ReportDiscussion },
  res: any
) => {
  try {
    const discussionId = req.params.discussionId;
    const data = req.body;
    const result = await updateReportDiscussion(discussionId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteReportDiscussion = async (
  req: { params: { discussionId: string } },
  res: any
) => {
  try {
    const discussionId = req.params.discussionId;
    const result = await deleteReportDiscussion(discussionId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
