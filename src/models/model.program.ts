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
          Account: {
            include: { Role: true }
          }
        }
      }
    }
  });
};

type ProgramWithAccounts = Programs & { Accounts?: { id: number }[] };

export const createProgram = async (data: ProgramWithAccounts) => {
  const { title, description, status, Accounts } = data;
  return await prisma.$transaction(async (tx) => {
    const program = await tx.programs.create({
      data: {
        title,
        description,
        status
      }
    });

    if (Accounts && Accounts.length > 0) {
      const assignments = Accounts.map((employee) => ({
        accountId: employee.id,
        programId: program.id
      }));

      await tx.programAssignment.createMany({
        data: assignments
      });
    }

    return program;
  });
};

export const updateProgram = async (id: string, data: ProgramWithAccounts) => {
  const { title, description, status, Accounts } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Update project main fields
    const updatedProject = await tx.projects.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status
      }
    });

    // 2. Delete existing employee assignments
    await tx.programAssignment.deleteMany({
      where: { programId: parseInt(id) }
    });

    // 3. Recreate new assignments if there are employees
    if (Accounts && Accounts.length > 0) {
      const assignments = Accounts.map((employee) => ({
        accountId: employee.id,
        programId: parseInt(id)
      }));

      await tx.programAssignment.createMany({
        data: assignments
      });
    }

    return updatedProject;
  });
};

export const deleteProgram = async (id: string) => {
  return await prisma.programs.delete({
    where: {
      id: parseInt(id)
    }
  });
};
