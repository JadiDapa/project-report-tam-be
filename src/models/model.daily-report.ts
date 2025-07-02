import { DailyReports } from '@prisma/client';
import { startOfDay, endOfDay } from 'date-fns';
import prisma from '../lib/prisma';

export const getAllDailyReports = async () => {
  return await prisma.dailyReports.findMany({
    include: {
      Account: true,
      DailyReportEvidences: true
    },
    orderBy: {
      createdAt: 'desc'
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
      DailyReportEvidences: true
    },
    orderBy: {
      createdAt: 'desc'
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
      DailyReportEvidences: true
    }
  });
};

export const getDailyReportByDate = async (date: string) => {
  const start = startOfDay(new Date(date));
  const end = endOfDay(new Date(date));

  return await prisma.dailyReports.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end
      }
    },
    include: {
      Account: true,
      DailyReportEvidences: true
    },
    orderBy: {
      createdAt: 'desc'
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

      await tx.dailyReportEvidences.createMany({
        data: fileUploads
      });
    }

    return report;
  });
};

export const updateDailyReport = async (
  id: string,
  data: DailyReports,
  evidences: Express.Multer.File[]
) => {
  const { title, description, accountId } = data;

  return await prisma.$transaction(async (tx) => {
    const reportId = parseInt(id);

    // 1. Update the report's main fields
    const updatedReport = await tx.dailyReports.update({
      where: { id: reportId },
      data: {
        title,
        description,
        accountId: Number(accountId)
      }
    });

    // 2. Delete all existing evidences
    await tx.dailyReportEvidences.deleteMany({
      where: { dailyReportsId: reportId }
    });

    // 3. Add all new evidences
    if (evidences && evidences.length > 0) {
      const fileUploads = evidences.map((file) => ({
        image: `${process.env.BASE_URL}/uploads/${file.filename}`,
        description: 'Desc Image',
        dailyReportsId: reportId
      }));

      await tx.dailyReportEvidences.createMany({
        data: fileUploads
      });
    }

    return updatedReport;
  });
};

export const deleteDailyReport = async (id: string) => {
  return await prisma.dailyReports.delete({
    where: {
      id: parseInt(id)
    }
  });
};
