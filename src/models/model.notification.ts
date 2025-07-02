import { Notifications } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllNotifications = async () => {
  return await prisma.notifications.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getNotificationsByAccountId = async (accountId: string) => {
  return await prisma.notifications.findMany({
    where: {
      accountId: parseInt(accountId)
    },
    include: {
      Account: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getNotificationById = async (id: string) => {
  return await prisma.notifications.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Account: true
    }
  });
};

export const createNotification = async (data: Notifications) => {
  return await prisma.notifications.create({
    data: data
  });
};

export const updateNotification = async (id: string, data: Notifications) => {
  return await prisma.notifications.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteNotification = async (id: string) => {
  return await prisma.notifications.delete({
    where: {
      id: parseInt(id)
    }
  });
};
