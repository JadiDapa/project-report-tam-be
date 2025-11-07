import { Programs } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllPrograms = async () => {
  return await prisma.programs.findMany({
    include: {
      Projects: true,
      Accounts: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

// export const getProgramsByAccountId = async (accountId: string) => {
//   return await prisma.programs.findMany({
//     where: {
//       Accounts: {
//         some: {
//           accountId: parseInt(accountId)
//         }
//       }
//     },
//     include: {
//       Projects: true
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   });
// };

export const getProgramById = async (id: string) => {
  return await prisma.programs.findUnique({
    where: { id: parseInt(id) },
    include: {
      Projects: true,
      ProgramAssignment: {
        include: {
          Account: true // 👈 this pulls in each related account
        }
      }
    }
  });
};

type ProgramWithAccounts = Programs & { Accounts?: { id: number }[] };

export const createProgram = async (data: ProgramWithAccounts) => {
  const { title, description, status, Accounts } = data;
  return await prisma.$transaction(async (tx) => {
    const project = await tx.programs.create({
      data: {
        title,
        description,
        status
      }
    });

    if (Accounts && Accounts.length > 0) {
      const assignments = Accounts.map((employee) => ({
        accountId: employee.id,
        projectId: project.id
      }));

      await tx.projectAssignment.createMany({
        data: assignments
      });
    }

    return project;
  });
};

export const updateProgram = async (id: string, data: Programs) => {
  return await prisma.programs.update({
    where: { id: parseInt(id) },
    data: {
      ...data
    }
  });
};

export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({
    where: {
      id: parseInt(id)
    }
  });
};
