import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport
} from '../models/model.report';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Reports } from '../types/reports';

export const handleGetAllReports = async (req: any, res: any) => {
  try {
    const result = await getAllReports();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetReportById = async (req: { params: { reportId: string } }, res: any) => {
  try {
    const reportId = req.params.reportId;
    const result = await getReportById(reportId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateReport = async (
  req: { body: Reports; files: Express.Multer.File[] },
  res: any
) => {
  try {
    const data = req.body;
    const evidences = req.files;
    console.log('WTF HAPPEN');

    const result = await createReport(data, evidences);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateReport = async (
  req: { params: { reportId: string }; body: Reports },
  res: any
) => {
  try {
    const reportId = req.params.reportId;
    const data = req.body;
    const result = await updateReport(reportId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteReport = async (req: { params: { reportId: string } }, res: any) => {
  try {
    const reportId = req.params.reportId;
    const result = await deleteReport(reportId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
