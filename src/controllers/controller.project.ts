import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByAccountId,
  getProjectsByProgramId
} from '../models/model.project';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import generateDoc from '../helpers/helper.generate-evidences';
import path from 'path';
import { Projects } from '@prisma/client';
import { format } from 'date-fns';
import { capitalize } from './controller.task';

export const handleGetAllProjects = async (req: any, res: any) => {
  try {
    const result = await getAllProjects();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetProjectsByProgramId = async (
  req: { params: { programId: string } },
  res: any
) => {
  try {
    const programId = req.params.programId;
    const result = await getProjectsByProgramId(programId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetProjectsByAccountId = async (
  req: { params: { accountId: string } },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const result = await getProjectsByAccountId(accountId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetProjectById = async (req: { params: { projectId: string } }, res: any) => {
  try {
    const projectId = req.params.projectId;
    const result = await getProjectById(projectId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGenerateProjectReport = async (
  req: { params: { projectId: string } },
  res: any
) => {
  const projectId = req.params.projectId;

  const project = await getProjectById(projectId);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const docData = {
    projectTitle: project.title,
    tasks: project.Tasks.map((task, taskIndex) => ({
      index: taskIndex + 1,
      title: `${task.type} ${task.item} ${task.quantity}`,
      date: task.updatedAt ? format(task.updatedAt, 'dd MMMM yyyy') : '-',
      te: (task.TaskEvidences ?? []).map((te, i) => ({
        index: i + 1,
        title: capitalize(te.title ?? ''),
        date: te.updatedAt !== te.createdAt ? format(te.updatedAt, 'dd MMMM yyyy') : '-',
        evidences: te.TaskEvidenceImages.filter((image) => image.isExport === true).map((image) => {
          const imagePath = image.baseImage
            ? path.resolve('uploads', 'images', path.basename(image.image))
            : path.resolve('uploads', path.basename(image.image));

          return {
            image: imagePath,
            account: image.Account?.fullname
          };
        })
      }))
    }))
  };

  try {
    const filePath = await generateDoc(
      docData,
      'Project Report ' + project.title,
      '../../project-template.docx'
    );

    if (!filePath) {
      return res.status(500).json({ error: 'Failed to generate document' });
    }

    res.download(filePath, 'project-report.docx');
    return SuccessResponse.DataFound(
      req,
      res,
      'Docx Created',
      `${process.env.BASE_URL}/uploads/evidences/${path.basename(filePath)}`
    );
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateProject = async (req: { body: Projects }, res: any) => {
  try {
    const data = req.body;
    const result = await createProject(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateProject = async (
  req: { params: { projectId: string }; body: Projects },
  res: any
) => {
  try {
    const projectId = req.params.projectId;
    const data = req.body;
    const result = await updateProject(projectId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteProject = async (req: { params: { projectId: string } }, res: any) => {
  try {
    const projectId = req.params.projectId;
    const result = await deleteProject(projectId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
