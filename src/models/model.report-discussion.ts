import prisma from '../lib/prisma';
import { ReportDiscussion } from '../types/report-discussion';

export const getAllReportDiscussions = async () => {
  return await prisma.reportDiscussions.findMany({});
};

export const getReportDiscussionsByReportId = async (reportId: string) => {
  return await prisma.reportDiscussions.findMany({
    where: {
      reportId: parseInt(reportId)
    },

    include: {
      Account: {
        select: {
          fullname: true,
          Role: true
        }
      }
    }
  });
};

export const getReportDiscussionById = async (id: string) => {
  return await prisma.reportDiscussions.findUnique({
    where: {
      id: parseInt(id)
    }
  });
};

export const createReportDiscussion = async (data: ReportDiscussion) => {
  const { content, accountId, reportId, mainContentId } = data;

  return await prisma.reportDiscussions.create({
    data: {
      mainContentId,
      content,
      accountId,
      reportId
    },
    include: {
      Account: {
        select: {
          fullname: true,
          Role: true
        }
      }
    }
  });
};

export const updateReportDiscussion = async (id: string, data: ReportDiscussion) => {
  const { content, accountId, reportId } = data;
  return await prisma.reportDiscussions.update({
    where: {
      id: parseInt(id)
    },
    data: {
      content,
      accountId,
      reportId
    }
  });
};

export const deleteReportDiscussion = async (id: string) => {
  return await prisma.reportDiscussions.delete({
    where: {
      id: parseInt(id)
    }
  });
};
