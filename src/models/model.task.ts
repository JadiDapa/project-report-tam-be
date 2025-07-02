import { TaskEvidences, Tasks } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllTasks = async () => {
  return await prisma.tasks.findMany({
    include: {
      Project: true,
      TaskEvidences: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTasksByTaskId = async (id: string) => {
  return await prisma.tasks.findMany({
    where: {
      projectId: parseInt(id)
    },
    include: {
      TaskEvidences: {
        include: {
          TaskEvidenceImages: true
        }
      },
      Project: {
        include: {
          Employees: { include: { Account: true } }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTaskById = async (id: string) => {
  return await prisma.tasks.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      TaskEvidences: {
        include: {
          TaskEvidenceImages: {
            include: {
              Account: true
            }
          }
        }
      },
      Project: true
    }
  });
};

export const createTasks = async (data: Tasks[]) => {
  await prisma.$transaction(async (tx) => {
    for (const task of data) {
      const createdTask = await tx.tasks.create({
        data: {
          type: task.type,
          item: task.item,
          quantity: Number(task.quantity),
          projectId: Number(task.projectId)
        }
      });

      const evidences = Array.from({ length: Number(task.quantity) }).map((_, i) => ({
        taskId: createdTask.id,
        title: `${createdTask.type} ${createdTask.item} ${i + 1}`
      }));

      await tx.taskEvidences.createMany({
        data: evidences
      });
    }
  });
};

export const createTask = async (data: Tasks) => {
  await prisma.$transaction(async (tx) => {
    const createdTask = await tx.tasks.create({
      data: {
        type: data.type,
        item: data.item,
        quantity: Number(data.quantity),
        projectId: Number(data.projectId)
      }
    });

    const evidences = Array.from({ length: Number(data.quantity) }).map((_, i) => ({
      taskId: createdTask.id,
      title: `${createdTask.type} ${createdTask.item} ${i + 1}`
    }));

    await tx.taskEvidences.createMany({
      data: evidences
    });
  });
};

export const createTaskEvidence = async (id: string, data: TaskEvidences) => {
  return await prisma.taskEvidences.create({
    data: {
      ...data,
      taskId: Number(id)
    }
  });
};

export const updateTask = async (id: string, data: Tasks) => {
  return await prisma.tasks.update({
    where: {
      id: parseInt(id)
    },
    data: {
      type: data.type,
      item: data.item,
      quantity: Number(data.quantity),
      projectId: Number(data.projectId)
    }
  });
};

export const deleteTask = async (id: string) => {
  return await prisma.tasks.delete({
    where: {
      id: parseInt(id)
    }
  });
};
