import {
  getAllDailyReports,
  getDailyReportById,
  createDailyReport,
  updateDailyReport,
  deleteDailyReport,
  getDailyReportsByAccountId,
  getDailyReportByDate
} from '../models/model.daily-report';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { DailyReports } from '@prisma/client';
import generateDoc from '../helpers/helper.generate-evidences';
import path from 'path';
import { format } from 'date-fns';

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

export const handleGenerateDailyReport = async (req: { params: { date: string } }, res: any) => {
  const date = req.params.date;

  const dailyReports = await getDailyReportByDate(date);

  if (!dailyReports) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const reports = await Promise.all(
    dailyReports.map(async (report, index) => {
      const evidence = report.DailyReportEvidences?.[0]; // May be undefined
      return {
        index: index + 1,
        image: evidence?.image ? `.${new URL(evidence.image).pathname}` : null,
        fullname: report.Account?.fullname || 'Unknown',
        title: report.title,
        description: report.description
      };
    })
  );

  const docData = {
    date: format(date, 'dd MMMM yyyy'),
    generatedDate: new Date().toLocaleDateString(),
    reports
  };

  try {
    const filePath = await generateDoc(
      docData,
      'Daily Report' + format(date, 'dd-MM-yyyy'),
      '../../daily_report_template.docx'
    );

    if (!filePath) {
      return res.status(500).json({ error: 'Failed to generate document' });
    }

    res.download(filePath, 'report.docx');
    return SuccessResponse.DataFound(
      req,
      res,
      'Docx Created',
      `${process.env.BASE_URL}/uploads/evidences/${path.basename(filePath)}`
    );
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
  req: { params: { dailyReportId: string }; body: DailyReports; files: Express.Multer.File[] },
  res: any
) => {
  try {
    const dailyReportId = req.params.dailyReportId;
    const data = req.body;
    const evidences = req.files;

    const result = await updateDailyReport(dailyReportId, data, evidences);
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
