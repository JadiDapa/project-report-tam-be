import { Router } from 'express';
import {
  handleGetAllAppSettings,
  handleCreateAppSetting,
  handleUpdateAppSetting,
  handleDeleteAppSetting,
  handleGetAppSettingById
} from '../controllers/controller.app-setting';

const AppSettingRouter = Router();

AppSettingRouter.get('/app-settings', handleGetAllAppSettings);
AppSettingRouter.get('/app-settings/:settingId', handleGetAppSettingById);
AppSettingRouter.post('/app-settings', handleCreateAppSetting);
AppSettingRouter.put('/app-settings/:settingId', handleUpdateAppSetting);
AppSettingRouter.delete('/app-settings/:settingId', handleDeleteAppSetting);

export default AppSettingRouter;
