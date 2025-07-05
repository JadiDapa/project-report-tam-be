import { AppSettings } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllAppSettings = async () => {
  return await prisma.appSettings.findMany({});
};

export const getAppSettingById = async (id: string) => {
  return await prisma.appSettings.findUnique({
    where: {
      id: parseInt(id)
    }
  });
};

export const getAppSettingByKey = async (key: string) => {
  return await prisma.appSettings.findUnique({
    where: {
      key: key
    }
  });
};

export const createAppSetting = async (data: AppSettings) => {
  return await prisma.appSettings.create({
    data: data
  });
};

export const updateAppSetting = async (id: string, data: AppSettings) => {
  return await prisma.appSettings.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteAppSetting = async (id: string) => {
  return await prisma.appSettings.delete({
    where: {
      id: parseInt(id)
    }
  });
};
