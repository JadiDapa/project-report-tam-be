import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByAccountId
} from '../models/model.project';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Projects } from '../types/projects';
import generateDoc from '../helpers/helper.generate-evidences';
import path from 'path';

export const handleGetAllProjects = async (req: any, res: any) => {
  try {
    const result = await getAllProjects();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
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

  const reports = await Promise.all(
    project.Reports.map(async (report, index) => {
      const evidence = report.ReportEvidences?.[0]; // May be undefined
      return {
        index: index + 1,
        location: report.location,
        image: evidence?.image ? `.${new URL(evidence.image).pathname}` : null
      };
    })
  );

  const docData = {
    projectName: project.title,
    generatedDate: new Date().toLocaleDateString(),
    reports
  };

  try {
    const filePath = await generateDoc(docData, project.title);

    if (!filePath) {
      return res.status(500).json({ error: 'Failed to generate document' });
    }

    res.download(filePath, 'report.docx');
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
