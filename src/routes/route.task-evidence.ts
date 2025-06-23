import { Router } from 'express';
import {
  handleGetAllTaskEvidences,
  handleUpdateTaskEvidence,
  handleDeleteTaskEvidence,
  handleGetTaskEvidenceById
} from '../controllers/controller.task-evidence';
import upload from '../middleware/file-upload.middleware';
import { handleCreateTaskEvidence } from '../controllers/controller.task';

const TaskEvidenceRouter = Router();

TaskEvidenceRouter.get('/task-evidences', handleGetAllTaskEvidences);
TaskEvidenceRouter.get('/task-evidences/:evidenceId', handleGetTaskEvidenceById);
TaskEvidenceRouter.post('/task-evidences', upload.single('image'), handleCreateTaskEvidence);
TaskEvidenceRouter.put(
  '/task-evidences/:evidenceId',
  upload.single('image'),
  handleUpdateTaskEvidence
);
TaskEvidenceRouter.delete('/task-evidences/:evidenceId', handleDeleteTaskEvidence);

export default TaskEvidenceRouter;
