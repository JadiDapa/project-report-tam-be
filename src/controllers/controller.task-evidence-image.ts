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
import path from 'path';
import { compressImage } from '../helpers/helper.compress-image';

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
  req: {
    body: TaskEvidenceImages;
    files: {
      image: Express.Multer.File[];
      baseImage: Express.Multer.File[];
    };
  },
  res: any
) => {
  try {
    const overlayFile = req.files.image[0];
    const baseFile = req.files.baseImage[0];

    // ==== Compress overlay image ====
    const overlayCompressedName = path.parse(overlayFile.filename).name + '.jpg';

    const overlayCompressedPath = await compressImage(overlayFile.path, overlayCompressedName);

    // ==== Compress base image (optional but recommended) ====
    const baseCompressedName = path.parse(baseFile.filename).name + '.jpg';

    const baseCompressedPath = await compressImage(baseFile.path, baseCompressedName);

    const data = {
      ...req.body,
      image: process.env.BASE_URL + '/uploads/images/' + overlayCompressedName,
      baseImage: process.env.BASE_URL + '/uploads/images/' + baseCompressedName
    };

    const result = await createTaskEvidenceImage(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    console.error('🔥 handleCreateTaskEvidenceImage ERROR', {
      error,
      body: req.body,
      files: req.files
    });

    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateTaskEvidenceImage = async (
  req: {
    params: { evidenceId: string };
    body: TaskEvidenceImages;
    files?: {
      image?: Express.Multer.File[];
    };
  },
  res: any
) => {
  try {
    const evidenceId = req.params.evidenceId;

    const updateData: Partial<TaskEvidenceImages> = {
      ...req.body
    };

    // ===== Handle overlay image update =====
    if (req.files?.image?.[0]) {
      const overlayFile = req.files.image[0];
      const overlayCompressedName = path.parse(overlayFile.filename).name + '.jpg';

      await compressImage(overlayFile.path, overlayCompressedName);

      updateData.image = process.env.BASE_URL + '/uploads/images/' + overlayCompressedName;
    }

    // ===== Normalize fields =====
    if (updateData.date) {
      updateData.date = new Date(updateData.date as Date);
    }

    if (updateData.latitude) {
      updateData.latitude = Number(updateData.latitude);
    }

    if (updateData.longitude) {
      updateData.longitude = Number(updateData.longitude);
    }

    const result = await updateTaskEvidenceImage(evidenceId, updateData);

    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    console.error('🔥 handleUpdateTaskEvidenceImage ERROR', error);
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
