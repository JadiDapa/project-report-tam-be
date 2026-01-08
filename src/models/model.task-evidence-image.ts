import { TaskEvidenceImages } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllTaskEvidenceImages = async () => {
  return await prisma.taskEvidenceImages.findMany({
    include: {
      Account: true,
      TaskEvidence: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTaskEvidenceImageById = async (id: string) => {
  return await prisma.taskEvidenceImages.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Account: true,
      TaskEvidence: true
    }
  });
};

export const createTaskEvidenceImage = async (data: TaskEvidenceImages) => {
  return await prisma.taskEvidenceImages.create({
    data: {
      image: data.image,
      baseImage: data.baseImage,
      date: new Date(data.date as Date),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      description: data.description,
      taskEvidenceId: Number(data.taskEvidenceId),
      accountId: Number(data.accountId)
    }
  });
};

export const updateTaskEvidenceImage = async (id: string, data: Partial<TaskEvidenceImages>) => {
  console.log(data);
  return await prisma.taskEvidenceImages.update({
    where: {
      id: parseInt(id)
    },
    data: {
      image: data.image,
      date: data.date,
      latitude: data.latitude,
      longitude: data.longitude,
      description: data.description,
      isExport: data.isExport
    }
  });
};

export const deleteTaskEvidenceImage = async (id: string) => {
  return await prisma.taskEvidenceImages.delete({
    where: {
      id: parseInt(id)
    }
  });
};
