import { Router } from 'express';
import {
  handleGetAllNotifications,
  handleCreateNotification,
  handleUpdateNotification,
  handleDeleteNotification,
  handleGetNotificationById,
  handleGetNotificationsByAccountId
} from '../controllers/controller.notification';

const NotificationRouter = Router();

NotificationRouter.get('/notifications', handleGetAllNotifications);
NotificationRouter.get('/notifications/account/:accountId', handleGetNotificationsByAccountId);
NotificationRouter.get('/notifications/:notificationId', handleGetNotificationById);
NotificationRouter.post('/notifications', handleCreateNotification);
NotificationRouter.put('/notifications/:notificationId', handleUpdateNotification);
NotificationRouter.delete('/notifications/:notificationId', handleDeleteNotification);

export default NotificationRouter;
