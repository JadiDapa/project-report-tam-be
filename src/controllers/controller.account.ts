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
import * as Clerk from '@clerk/clerk-sdk-node';

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

// Initialize Clerk Admin SDK
const clerk = Clerk;

type AccountWithPassword = Accounts & { password: string };

export const handleCreateAccount = async (req: { body: AccountWithPassword }, res: any) => {
  try {
    const data = req.body;

    const clerkUser = await clerk.users.createUser({
      emailAddress: [data.email],
      password: data.password
    });

    // const now = new Date();
    const result = await createAccount({
      fullname: data.fullname,
      email: data.email,
      roleId: data.roleId
    });

    return SuccessResponse.DataFound(req, res, 'New Account Created', {
      // clerkUserId: clerkUser.id,
      ...result
    });
  } catch (error: any) {
    console.error('Account creation error:', error);
    return ErrorResponse.InternalServer(req, res, error.message || 'Failed to create account');
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
