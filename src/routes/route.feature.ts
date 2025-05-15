import { Router } from 'express';
import {
  handleGetAllFeatures,
  handleCreateFeature,
  handleUpdateFeature,
  handleDeleteFeature,
  handleGetFeatureById
} from '../controllers/controller.feature';

const FeatureRouter = Router();

FeatureRouter.get('/features', handleGetAllFeatures);
FeatureRouter.get('/features/:featureId', handleGetFeatureById);
FeatureRouter.post('/features', handleCreateFeature);
FeatureRouter.put('/features/:featureId', handleUpdateFeature);
FeatureRouter.delete('/features/:featureId', handleDeleteFeature);

export default FeatureRouter;
