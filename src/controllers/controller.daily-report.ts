import {
  getAllDailyReports,
  getDailyReportById,
  createDailyReport,
  updateDailyReport,
  deleteDailyReport,
  getDailyReportsByAccountId
} from '../models/model.daily-report';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { DailyReports } from '@prisma/client';

export const handleGetAllDailyReports = async (req: any, res: any) => {
  try {
    const result = await getAllDailyReports();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetDailyReportsByAccountId = async (
  req: { params: { accountId: string } },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const result = await getDailyReportsByAccountId(accountId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
export const handleGetDailyReportById = async (
  req: { params: { dailyReportId: string } },
  res: any
) => {
  try {
    const dailyReportId = req.params.dailyReportId;
    const result = await getDailyReportById(dailyReportId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateDailyReport = async (
  req: { body: DailyReports; files: Express.Multer.File[] },
  res: any
) => {
  try {
    const data = req.body;
    const evidences = req.files;

    const result = await createDailyReport(data, evidences);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateDailyReport = async (
  req: { params: { dailyReportId: string }; body: DailyReports },
  res: any
) => {
  try {
    const dailyReportId = req.params.dailyReportId;
    const data = req.body;
    const result = await updateDailyReport(dailyReportId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteDailyReport = async (
  req: { params: { dailyReportId: string } },
  res: any
) => {
  try {
    const dailyReportId = req.params.dailyReportId;
    const result = await deleteDailyReport(dailyReportId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
