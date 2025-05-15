import { Router } from 'express';
import {
  handleGetAllRoles,
  handleCreateRole,
  handleUpdateRole,
  handleDeleteRole,
  handleGetRoleById
} from '../controllers/controller.role';

const RoleRouter = Router();

RoleRouter.get('/roles', handleGetAllRoles);
RoleRouter.get('/roles/:roleId', handleGetRoleById);
RoleRouter.post('/roles', handleCreateRole);
RoleRouter.put('/roles/:roleId', handleUpdateRole);
RoleRouter.delete('/roles/:roleId', handleDeleteRole);

export default RoleRouter;
