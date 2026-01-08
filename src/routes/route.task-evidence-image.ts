import { Router } from 'express';
import {
  handleGetAllTaskEvidenceImages,
  handleUpdateTaskEvidenceImage,
  handleDeleteTaskEvidenceImage,
  handleGetTaskEvidenceImageById,
  handleCreateTaskEvidenceImage
} from '../controllers/controller.task-evidence-image';
import upload from '../middleware/file-upload.middleware';

const TaskEvidenceImageRouter = Router();

TaskEvidenceImageRouter.get('/task-evidence-images', handleGetAllTaskEvidenceImages);
TaskEvidenceImageRouter.get('/task-evidence-images/:evidenceId', handleGetTaskEvidenceImageById);
TaskEvidenceImageRouter.post(
  '/task-evidence-images',
  upload.fields([
    { name: 'image', maxCount: 1 }, // overlay image
    { name: 'baseImage', maxCount: 1 } // original image
  ]),
  handleCreateTaskEvidenceImage
);
TaskEvidenceImageRouter.put(
  '/task-evidence-images/:evidenceId',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  handleUpdateTaskEvidenceImage
);

TaskEvidenceImageRouter.delete('/task-evidence-images/:evidenceId', handleDeleteTaskEvidenceImage);

export default TaskEvidenceImageRouter;
