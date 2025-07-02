import { TaskEvidences } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllTaskEvidences = async () => {
  return await prisma.taskEvidences.findMany({
    include: {
      Task: true,
      TaskEvidenceImages: true
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
      TaskEvidenceImages: true
    }
  });
};

export const createTaskEvidence = async (data: TaskEvidences) => {
  return await prisma.taskEvidences.create({
    data: data
  });
};

export const updateTaskEvidence = async (
  id: string,
  data: TaskEvidences & { accountId: string },
  evidences: Express.Multer.File[]
) => {
  const { title, description, accountId } = data;

  return await prisma.$transaction(async (tx) => {
    const reportId = parseInt(id);

    // 1. Update the report's main fields
    const updatedReport = await tx.taskEvidences.update({
      where: { id: reportId },
      data: {
        title,
        description
      }
    });

    // 2. Delete all existing evidences
    await tx.taskEvidenceImages.deleteMany({
      where: { taskEvidenceId: reportId }
    });

    // 3. Add all new evidences
    if (evidences && evidences.length > 0) {
      const fileUploads = evidences.map((file) => ({
        image: `${process.env.BASE_URL}/uploads/${file.filename}`,
        description: 'Desc Image',
        taskEvidenceId: reportId,
        accountId: Number(accountId)
      }));

      await tx.taskEvidenceImages.createMany({
        data: fileUploads
      });
    }

    return updatedReport;
  });
};

export const deleteTaskEvidence = async (id: string) => {
  return await prisma.taskEvidences.delete({
    where: {
      id: parseInt(id)
    }
  });
};
