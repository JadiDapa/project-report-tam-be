import prisma from '../lib/prisma';
import { Reports } from '../types/reports';

export const getAllReports = async () => {
  return await prisma.reports.findMany({
    include: {
      Project: true,
      Account: true,
      ReportEvidences: true
    }
  });
};

export const getReportsByReportId = async (id: string) => {
  return await prisma.reports.findMany({
    where: {
      projectId: parseInt(id)
    },
    include: {
      Account: {
        select: {
          fullname: true,
          Role: true
        }
      },
      ReportEvidences: true
    }
  });
};

export const getReportById = async (id: string) => {
  return await prisma.reports.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Project: true,
      ReportEvidences: true,
      Account: true
    }
  });
};

export const createReport = async (data: Reports, evidences: Express.Multer.File[]) => {
  const { title, description, serialNumber, location, projectId, accountId } = data;

  return await prisma.$transaction(async (tx) => {
    const report = await tx.reports.create({
      data: {
        title,
        description,
        serialNumber,
        location,
        projectId: Number(projectId),
        accountId: Number(accountId)
      }
    });

    if (evidences && evidences.length > 0) {
      const fileUploads = await Promise.all(
        evidences.map(async (evidence) => {
          return {
            image: `${process.env.BASE_URL}/uploads/${evidence.filename}`,
            description: 'Desc Image',
            reportId: report.id
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

export const updateReport = async (id: string, data: Reports) => {
  const { title, description, serialNumber, location, projectId, accountId } = data;

  return await prisma.reports.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      description,
      serialNumber,
      location,
      projectId,
      accountId
    }
  });
};

export const deleteReport = async (id: string) => {
  return await prisma.reports.delete({
    where: {
      id: parseInt(id)
    }
  });
};
