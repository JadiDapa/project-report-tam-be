import { Features } from '@prisma/client';
import prisma from '../lib/prisma';

export const getAllFeatures = async () => {
  return await prisma.features.findMany({});
};

export const getFeatureById = async (id: string) => {
  return await prisma.features.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Roles: true
    }
  });
};

export const createFeature = async (data: Features) => {
  return await prisma.features.create({
    data: data
  });
};

export const updateFeature = async (id: string, data: Features) => {
  return await prisma.features.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteFeature = async (id: string) => {
  return await prisma.features.delete({
    where: {
      id: parseInt(id)
    }
  });
};
