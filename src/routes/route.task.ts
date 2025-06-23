import { Router } from 'express';
import {
  handleGetAllTasks,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleGetTaskById,
  handleCreateTasks,
  handleGenerateTaskEvidence
} from '../controllers/controller.task';

const TaskRouter = Router();

TaskRouter.get('/tasks', handleGetAllTasks);
TaskRouter.get('/tasks/:taskId', handleGetTaskById);
TaskRouter.get('/tasks/generate-evidence/:taskId', handleGenerateTaskEvidence);
TaskRouter.post('/tasks', handleCreateTask);
TaskRouter.post('/tasks/generate', handleCreateTasks);
// TaskRouter.post('/tasks/:taskId', upload.single('image'), handleCreateTaskEvidence);
TaskRouter.put('/tasks/:taskId', handleUpdateTask);
TaskRouter.delete('/tasks/:taskId', handleDeleteTask);

export default TaskRouter;
