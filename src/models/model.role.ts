import { Roles } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllRoles = async () => {
  return await prisma.roles.findMany({});
};

export const getRoleById = async (id: string) => {
  return await prisma.roles.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Accounts: true,
      Features: true
    }
  });
};

export type RoleInput = {
  name: string;
  description?: string;
  features: number[];
};

export const createRole = async (data: RoleInput) => {
  return await prisma.roles.create({
    data: {
      name: data.name,
      description: data.description,
      Features: {
        connect: data.features.map((id) => ({ id }))
      }
    }
  });
};

export const updateRole = async (id: string, data: RoleInput) => {
  return await prisma.roles.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: data.name,
      description: data.description,
      Features: {
        connect: data.features.map((id) => ({ id }))
      }
    }
  });
};

export const deleteRole = async (id: string) => {
  return await prisma.roles.delete({
    where: {
      id: parseInt(id)
    }
  });
};
