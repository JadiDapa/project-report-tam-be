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

export const createDailyReport = async (data: DailyReports) => {
  return await prisma.dailyReports.create({
    data: data
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
