import { DailyReports } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllDailyReports = async () => {
  return await prisma.dailyReports.findMany({
    include: {
      Account: true,
      ReportEvidences: true
    }
  });
};

export const getDailyReportsByAccountId = async (accountId: string) => {
  return await prisma.dailyReports.findMany({
    where: {
      accountId: parseInt(accountId)
    },
    include: {
      Account: true,
      ReportEvidences: true
    }
  });
};

export const getDailyReportById = async (id: string) => {
  return await prisma.dailyReports.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Account: true,
      ReportEvidences: true
    }
  });
};

export const createDailyReport = async (data: DailyReports, evidences: Express.Multer.File[]) => {
  const { title, description, accountId } = data;

  return await prisma.$transaction(async (tx) => {
    const report = await tx.dailyReports.create({
      data: {
        title,
        description,
        accountId: Number(accountId)
      }
    });

    if (evidences && evidences.length > 0) {
      const fileUploads = await Promise.all(
        evidences.map(async (evidence) => {
          return {
            image: `${process.env.BASE_URL}/uploads/${evidence.filename}`,
            description: 'Desc Image',
            dailyReportsId: report.id
          };
        })
      );

      await tx.reportEvidences.createMany({
        data: fileUploads
      });
    }

    return report;
  });
};

export const updateDailyReport = async (id: string, data: DailyReports) => {
  return await prisma.dailyReports.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteDailyReport = async (id: string) => {
  return await prisma.dailyReports.delete({
    where: {
      id: parseInt(id)
    }
  });
};
