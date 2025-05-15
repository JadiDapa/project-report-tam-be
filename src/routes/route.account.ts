import { Router } from 'express';
import {
  handleGetAllAccounts,
  handleCreateAccount,
  handleUpdateAccount,
  handleDeleteAccount,
  handleGetAccountById,
  handleGetAccountByEmail
} from '../controllers/controller.account';
import upload from '../middleware/file-upload.middleware';

const AccountRouter = Router();

AccountRouter.get('/accounts', handleGetAllAccounts);
AccountRouter.get('/accounts/email/:email', handleGetAccountByEmail);
AccountRouter.get('/accounts/:accountId', handleGetAccountById);
AccountRouter.post('/accounts', handleCreateAccount);
AccountRouter.put('/accounts/:accountId', upload.single('image'), handleUpdateAccount);
AccountRouter.delete('/accounts/:accountId', handleDeleteAccount);

export default AccountRouter;
