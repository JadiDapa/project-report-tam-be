import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  RoleInput
} from '../models/model.role';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Roles } from '../types/roles';

export const handleGetAllRoles = async (req: any, res: any) => {
  try {
    const result = await getAllRoles();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetRoleById = async (req: { params: { roleId: string } }, res: any) => {
  try {
    const roleId = req.params.roleId;
    const result = await getRoleById(roleId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateRole = async (req: { body: RoleInput }, res: any) => {
  try {
    const data = req.body;

    const result = await createRole(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateRole = async (
  req: { params: { roleId: string }; body: RoleInput },
  res: any
) => {
  try {
    const roleId = req.params.roleId;
    const data = req.body;
    const result = await updateRole(roleId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteRole = async (req: { params: { roleId: string } }, res: any) => {
  try {
    const roleId = req.params.roleId;
    const result = await deleteRole(roleId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
