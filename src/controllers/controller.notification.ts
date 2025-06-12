import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationsByAccountId
} from '../models/model.notification';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Notifications } from '@prisma/client';

export const handleGetAllNotifications = async (req: any, res: any) => {
  try {
    const result = await getAllNotifications();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetNotificationsByAccountId = async (
  req: { params: { accountId: string } },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const result = await getNotificationsByAccountId(accountId);
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetNotificationById = async (
  req: { params: { notificationId: string } },
  res: any
) => {
  try {
    const notificationId = req.params.notificationId;
    const result = await getNotificationById(notificationId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateNotification = async (req: { body: Notifications }, res: any) => {
  try {
    const data = req.body;

    const result = await createNotification(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateNotification = async (
  req: { params: { notificationId: string }; body: Notifications },
  res: any
) => {
  try {
    const notificationId = req.params.notificationId;
    const data = req.body;
    const result = await updateNotification(notificationId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteNotification = async (
  req: { params: { notificationId: string } },
  res: any
) => {
  try {
    const notificationId = req.params.notificationId;
    const result = await deleteNotification(notificationId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
