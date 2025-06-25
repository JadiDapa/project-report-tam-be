import prisma from '../lib/prisma';
import { Projects } from '../types/projects';

export const getAllProjects = async () => {
  return await prisma.projects.findMany({
    include: {
      Employees: true,
      Reports: true,
      Tasks: {
        include: {
          TaskEvidences: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
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
    },
    include: {
      Employees: true,
      Reports: true,
      Tasks: {
        include: {
          TaskEvidences: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getProjectById = async (id: string) => {
  return await prisma.projects.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Employees: {
        include: {
          Account: {
            include: {
              Role: true
            }
          }
        }
      },
      Reports: {
        include: {
          Account: true,
          ReportEvidences: true
        }
      },
      Tasks: {
        include: {
          TaskEvidences: {
            include: {
              Account: true
            }
          }
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
  const { title, description, startDate, endDate, status, Employees } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Update project main fields
    const updatedProject = await tx.projects.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status
      }
    });

    // 2. Delete existing employee assignments
    await tx.projectAssignment.deleteMany({
      where: { projectId: parseInt(id) }
    });

    // 3. Recreate new assignments if there are employees
    if (Employees && Employees.length > 0) {
      const assignments = Employees.map((employee) => ({
        accountId: employee.id,
        projectId: parseInt(id)
      }));

      await tx.projectAssignment.createMany({
        data: assignments
      });
    }

    return updatedProject;
  });
};

export const deleteProject = async (id: string) => {
  return await prisma.projects.delete({
    where: {
      id: parseInt(id)
    }
  });
};
