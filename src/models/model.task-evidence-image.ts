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
      description: data.description,
      taskEvidenceId: Number(data.taskEvidenceId),
      accountId: Number(data.accountId)
    }
  });
};

export const updateTaskEvidenceImage = async (id: string, data: TaskEvidenceImages) => {
  return await prisma.taskEvidenceImages.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteTaskEvidenceImage = async (id: string) => {
  return await prisma.taskEvidenceImages.delete({
    where: {
      id: parseInt(id)
    }
  });
};
