import { Router } from 'express';
import {
  handleGetAllProjects,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject,
  handleGetProjectById,
  handleGenerateProjectReport,
  handleGetProjectsByAccountId,
  handleGetProjectsByProgramId
} from '../controllers/controller.project';

const ProjectRouter = Router();

// Apply requireAuth() to all routes that need to be protected
ProjectRouter.get('/projects', handleGetAllProjects);
ProjectRouter.get('/projects/program/:programId', handleGetProjectsByProgramId);
ProjectRouter.get('/projects/account/:accountId', handleGetProjectsByAccountId);
ProjectRouter.get('/projects/:projectId', handleGetProjectById);
ProjectRouter.get(
  '/projects/generate-evidence/:projectId',

  handleGenerateProjectReport
);
ProjectRouter.post('/projects', handleCreateProject);
ProjectRouter.put('/projects/:projectId', handleUpdateProject);
ProjectRouter.delete('/projects/:projectId', handleDeleteProject);

export default ProjectRouter;
