import { Router } from 'express';
import {
  handleGetAllPrograms,
  handleCreateProgram,
  handleUpdateProgram,
  handleDeleteProgram,
  handleGetProgramById
} from '../controllers/controller.program';

const ProgramRouter = Router();

// Apply requireAuth() to all routes that need to be protected
ProgramRouter.get('/programs', handleGetAllPrograms);
ProgramRouter.get('/programs/:programId', handleGetProgramById);
ProgramRouter.post('/programs', handleCreateProgram);
ProgramRouter.put('/programs/:programId', handleUpdateProgram);
ProgramRouter.delete('/programs/:programId', handleDeleteProgram);

export default ProgramRouter;
