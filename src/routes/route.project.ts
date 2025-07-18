import { Router } from 'express';
import {
  handleGetAllProjects,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject,
  handleGetProjectById,
  handleGenerateProjectReport,
  handleGetProjectsByAccountId
} from '../controllers/controller.project';
import { requireAuth } from '@clerk/express';

const ProjectRouter = Router();

// Apply requireAuth() to all routes that need to be protected
ProjectRouter.get('/projects', requireAuth(), handleGetAllProjects);
ProjectRouter.get('/projects/account/:accountId', requireAuth(), handleGetProjectsByAccountId);
ProjectRouter.get('/projects/:projectId', requireAuth(), handleGetProjectById);
ProjectRouter.get(
  '/projects/generate-report/:projectId',
  requireAuth(),
  handleGenerateProjectReport
);
ProjectRouter.post('/projects', requireAuth(), handleCreateProject);
ProjectRouter.put('/projects/:projectId', requireAuth(), handleUpdateProject);
ProjectRouter.delete('/projects/:projectId', requireAuth(), handleDeleteProject);

export default ProjectRouter;
