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

const ProjectRouter = Router();

ProjectRouter.get('/projects', handleGetAllProjects);
ProjectRouter.get('/projects/account/:accountId', handleGetProjectsByAccountId);
ProjectRouter.get('/projects/:projectId', handleGetProjectById);
ProjectRouter.get('/projects/generate-report/:projectId', handleGenerateProjectReport);
ProjectRouter.post('/projects', handleCreateProject);
ProjectRouter.put('/projects/:projectId', handleUpdateProject);
ProjectRouter.delete('/projects/:projectId', handleDeleteProject);

export default ProjectRouter;
