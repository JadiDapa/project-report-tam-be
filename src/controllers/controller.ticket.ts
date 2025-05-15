import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByHandlerId,
  getTicketsByRequesterId
} from '../models/model.ticket';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { Tickets } from '@prisma/client';

export const handleGetAllTickets = async (req: any, res: any) => {
  try {
    const result = await getAllTickets();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTicketsByRequesterId = async (
  req: { params: { accountId: string } },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const result = await getTicketsByRequesterId(accountId);
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTicketsByHandlerId = async (
  req: { params: { accountId: string } },
  res: any
) => {
  try {
    const accountId = req.params.accountId;
    const result = await getTicketsByHandlerId(accountId);
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTicketById = async (req: { params: { ticketId: string } }, res: any) => {
  try {
    const ticketId = req.params.ticketId;
    const result = await getTicketById(ticketId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTicket = async (req: { body: Tickets }, res: any) => {
  try {
    const data = req.body;

    const result = await createTicket(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateTicket = async (
  req: { params: { ticketId: string }; body: Tickets },
  res: any
) => {
  try {
    const ticketId = req.params.ticketId;
    const data = req.body;
    const result = await updateTicket(ticketId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteTicket = async (req: { params: { ticketId: string } }, res: any) => {
  try {
    const ticketId = req.params.ticketId;
    const result = await deleteTicket(ticketId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};
