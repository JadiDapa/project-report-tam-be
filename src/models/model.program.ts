import { Programs } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllPrograms = async () => {
  return await prisma.programs.findMany({
    include: {
      Projects: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

// export const getProgramsByAccountId = async (accountId: string) => {
//   return await prisma.programs.findMany({
//     where: {
//       Employees: {
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
    where: {
      id: parseInt(id)
    },
    include: {
      Projects: true
    }
  });
};

export const createProgram = async (data: Programs) => {
  return await prisma.programs.create({
    data: {
      ...data
    }
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
