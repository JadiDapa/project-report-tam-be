import {
  getAllTaskEvidences,
  getTaskEvidenceById,
  createTaskEvidence,
  updateTaskEvidence,
  deleteTaskEvidence
} from '../models/model.task-evidence';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { TaskEvidences } from '@prisma/client';

export const handleGetAllTaskEvidences = async (req: any, res: any) => {
  try {
    const result = await getAllTaskEvidences();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTaskEvidenceById = async (
  req: { params: { evidenceId: string } },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const result = await getTaskEvidenceById(evidenceId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTaskEvidence = async (req: { body: TaskEvidences }, res: any) => {
  try {
    const data = req.body;

    const result = await createTaskEvidence(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateTaskEvidence = async (
  req: { params: { evidenceId: string }; body: TaskEvidences; file: Express.Multer.File },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const imageFile = req.file.filename;

    const data = { ...req.body, image: process.env.BASE_URL + '/uploads/' + imageFile };

    const result = await updateTaskEvidence(evidenceId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteTaskEvidence = async (
  req: { params: { evidenceId: string } },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const result = await deleteTaskEvidence(evidenceId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
