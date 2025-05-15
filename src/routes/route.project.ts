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
import { verifyToken } from '../middleware/verify-token';

const ProjectRouter = Router();

ProjectRouter.get('/projects', verifyToken, handleGetAllProjects);
ProjectRouter.get('/projects/account/:accountId', verifyToken, handleGetProjectsByAccountId);
ProjectRouter.get('/projects/:projectId', verifyToken, handleGetProjectById);
ProjectRouter.get('/projects/generate-report/:projectId', handleGenerateProjectReport);
ProjectRouter.post('/projects', verifyToken, handleCreateProject);
ProjectRouter.put('/projects/:projectId', verifyToken, handleUpdateProject);
ProjectRouter.delete('/projects/:projectId', verifyToken, handleDeleteProject);

export default ProjectRouter;
