import { TaskEvidences } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllTaskEvidences = async () => {
  return await prisma.taskEvidences.findMany({
    include: {
      Task: true,
      Account: true
    }
  });
};

export const getTaskEvidenceById = async (id: string) => {
  return await prisma.taskEvidences.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Task: true,
      Account: true
    }
  });
};

export const createTaskEvidence = async (data: TaskEvidences) => {
  return await prisma.taskEvidences.create({
    data: data
  });
};

export const updateTaskEvidence = async (id: string, data: TaskEvidences) => {
  return await prisma.taskEvidences.update({
    where: {
      id: parseInt(id)
    },
    data: {
      image: data.image,
      description: data.description,
      taskId: Number(data.taskId),
      accountId: Number(data.accountId)
    }
  });
};

export const deleteTaskEvidence = async (id: string) => {
  return await prisma.taskEvidences.delete({
    where: {
      id: parseInt(id)
    }
  });
};
