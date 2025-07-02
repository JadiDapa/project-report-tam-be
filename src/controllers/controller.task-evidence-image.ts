import {
  getAllTaskEvidenceImages,
  getTaskEvidenceImageById,
  createTaskEvidenceImage,
  updateTaskEvidenceImage,
  deleteTaskEvidenceImage
} from '../models/model.task-evidence-image';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { TaskEvidenceImages } from '@prisma/client';

export const handleGetAllTaskEvidenceImages = async (req: any, res: any) => {
  try {
    const result = await getAllTaskEvidenceImages();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTaskEvidenceImageById = async (
  req: { params: { evidenceId: string } },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const result = await getTaskEvidenceImageById(evidenceId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTaskEvidenceImage = async (
  req: { body: TaskEvidenceImages; file: Express.Multer.File },
  res: any
) => {
  try {
    const image = req.file.filename;
    const data = { ...req.body, image: `${process.env.BASE_URL}/uploads/${image}` };

    const result = await createTaskEvidenceImage(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateTaskEvidenceImage = async (
  req: {
    params: { evidenceId: string };
    body: TaskEvidenceImages & { accountId: string };
    file: Express.Multer.File;
  },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const image = req.file.filename;
    const data = { ...req.body, image: `${process.env.BASE_URL}/uploads/${image}` };

    const result = await updateTaskEvidenceImage(evidenceId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteTaskEvidenceImage = async (
  req: { params: { evidenceId: string } },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;
    const result = await deleteTaskEvidenceImage(evidenceId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
