import { Accounts } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllAccounts = async () => {
  return await prisma.accounts.findMany({
    include: {
      Projects: true,
      Reports: true,
      Role: true
    }
  });
};

export const getAccountById = async (id: string) => {
  return await prisma.accounts.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Projects: { include: { Project: true, Account: true } },
      Reports: { include: { Project: true, Account: true } },
      Role: { include: { Features: true } },
      DailyReports: { include: { Account: true, DailyReportEvidences: true } },
      ReportDiscussions: true,
      TicketHandler: true,
      TicketRequester: true
    }
  });
};

export const getAccountByEmail = async (email: string) => {
  return await prisma.accounts.findUnique({
    where: {
      email: email
    },
    include: {
      Projects: { include: { Project: true, Account: true } },
      Reports: { include: { Project: true, Account: true } },
      Role: { include: { Features: true } },
      DailyReports: { include: { Account: true, DailyReportEvidences: true } },
      ReportDiscussions: true,
      TicketHandler: true,
      TicketRequester: true
    }
  });
};

export const createAccount = async (data: any) => {
  return await prisma.accounts.create({
    data: data
  });
};

export const updateAccount = async (id: string, data: Accounts) => {
  return await prisma.accounts.update({
    where: { id: parseInt(id) },
    data: {
      fullname: data.fullname,
      email: data.email,
      roleId: Number(data.roleId),
      image: data.image,
      phoneNumber: data.phoneNumber
    }
  });
};

export const deleteAccount = async (id: string) => {
  return await prisma.accounts.delete({
    where: {
      id: parseInt(id)
    }
  });
};
