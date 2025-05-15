import prisma from '../lib/prisma';
import { Projects } from '../types/projects';

export const getAllProjects = async () => {
  return await prisma.projects.findMany({
    include: {
      Employees: true,
      Reports: true
    }
  });
};

export const getProjectsByAccountId = async (accountId: string) => {
  return await prisma.projects.findMany({
    where: {
      Employees: {
        some: {
          accountId: parseInt(accountId)
        }
      }
    }
  });
};

export const getProjectById = async (id: string) => {
  return await prisma.projects.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Employees: { include: { Account: true } },
      Reports: {
        include: {
          Account: true,
          ReportEvidences: true
        }
      }
    }
  });
};

export const createProject = async (data: Projects) => {
  const { title, description, startDate, endDate, status, Employees } = data;
  return await prisma.$transaction(async (tx) => {
    const project = await tx.projects.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status
      }
    });

    if (Employees && Employees.length > 0) {
      const assignments = Employees.map((employee) => ({
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

export const updateProject = async (id: string, data: Projects) => {
  const { title, description, startDate, endDate, status } = data;

  return await prisma.projects.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status
    }
  });
};

export const deleteProject = async (id: string) => {
  return await prisma.projects.delete({
    where: {
      id: parseInt(id)
    }
  });
};
