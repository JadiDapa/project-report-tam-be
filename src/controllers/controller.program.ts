import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
} from '../models/model.program';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import generateDoc from '../helpers/helper.generate-evidences';
import path from 'path';
import { Programs } from '@prisma/client';

export const handleGetAllPrograms = async (req: any, res: any) => {
  try {
    const result = await getAllPrograms();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

// export const handleGetProgramsByAccountId = async (
//   req: { params: { accountId: string } },
//   res: any
// ) => {
//   try {
//     const accountId = req.params.accountId;
//     const result = await getProgramsByAccountId(accountId);
//     return SuccessResponse.DataFound(req, res, 'A Data Found', result);
//   } catch (error) {
//     return ErrorResponse.InternalServer(req, res, (error as Error).message);
//   }
// };

export const handleGetProgramById = async (req: { params: { programId: string } }, res: any) => {
  try {
    const programId = req.params.programId;
    const result = await getProgramById(programId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateProgram = async (req: { body: Programs }, res: any) => {
  try {
    const data = req.body;
    const result = await createProgram(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateProgram = async (
  req: { params: { programId: string }; body: Programs },
  res: any
) => {
  try {
    const programId = req.params.programId;
    const data = req.body;
    const result = await updateProgram(programId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteProgram = async (req: { params: { programId: string } }, res: any) => {
  try {
    const programId = req.params.programId;
    const result = await deleteProgram(programId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
