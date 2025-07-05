import {
  getAllAppSettings,
  getAppSettingById,
  createAppSetting,
  updateAppSetting,
  deleteAppSetting
} from '../models/model.app-setting';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { AppSettings } from '@prisma/client';

export const handleGetAllAppSettings = async (req: any, res: any) => {
  try {
    const result = await getAllAppSettings();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetAppSettingById = async (req: { params: { settingId: string } }, res: any) => {
  try {
    const settingId = req.params.settingId;
    const result = await getAppSettingById(settingId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateAppSetting = async (req: { body: AppSettings }, res: any) => {
  try {
    const data = req.body;

    const result = await createAppSetting(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateAppSetting = async (
  req: { params: { settingId: string }; body: AppSettings },
  res: any
) => {
  try {
    const settingId = req.params.settingId;
    const data = req.body;
    const result = await updateAppSetting(settingId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteAppSetting = async (req: { params: { settingId: string } }, res: any) => {
  try {
    const settingId = req.params.settingId;
    const result = await deleteAppSetting(settingId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
