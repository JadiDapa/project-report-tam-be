import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountByEmail
} from '../models/model.account';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Accounts } from '@prisma/client';

export const handleGetAllAccounts = async (req: any, res: any) => {
  try {
    const result = await getAllAccounts();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetAccountByEmail = async (req: { params: { email: string } }, res: any) => {
  try {
    const email = req.params.email;
    const result = await getAccountByEmail(email);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetAccountById = async (req: { params: { accountId: string } }, res: any) => {
  try {
    const accountId = req.params.accountId;
    const result = await getAccountById(accountId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateAccount = async (req: { body: Accounts }, res: any) => {
  try {
    const data = req.body;
    const result = await createAccount(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateAccount = async (
  req: { params: { accountId: string }; body: Accounts; file: Express.Multer.File },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const imageFile = req.file.filename;
    const data = { ...req.body, image: process.env.BASE_URL + '/uploads/' + imageFile };
    const result = await updateAccount(accountId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteAccount = async (req: { params: { accountId: string } }, res: any) => {
  try {
    const accountId = req.params.accountId;
    const result = await deleteAccount(accountId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
