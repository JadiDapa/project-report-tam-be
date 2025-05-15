import {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature
} from '../models/model.feature';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Features } from '../types/features';

export const handleGetAllFeatures = async (req: any, res: any) => {
  try {
    const result = await getAllFeatures();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetFeatureById = async (req: { params: { featureId: string } }, res: any) => {
  try {
    const featureId = req.params.featureId;
    const result = await getFeatureById(featureId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateFeature = async (req: { body: Features }, res: any) => {
  try {
    const data = req.body;

    const result = await createFeature(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateFeature = async (
  req: { params: { featureId: string }; body: Features },
  res: any
) => {
  try {
    const featureId = req.params.featureId;
    const data = req.body;
    const result = await updateFeature(featureId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteFeature = async (req: { params: { featureId: string } }, res: any) => {
  try {
    const featureId = req.params.featureId;
    const result = await deleteFeature(featureId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
