import { Router } from 'express';
import {
  handleGetAllTickets,
  handleCreateTicket,
  handleUpdateTicket,
  handleDeleteTicket,
  handleGetTicketById,
  handleGetTicketsByHandlerId,
  handleGetTicketsByRequesterId,
  handleCreateTicketMessagge
} from '../controllers/controller.ticket';
import upload from '../middleware/file-upload.middleware';

const TicketRouter = Router();

TicketRouter.get('/tickets', handleGetAllTickets);
TicketRouter.get('/tickets/requester/:accountId', handleGetTicketsByRequesterId);
TicketRouter.get('/tickets/handler/:accountId', handleGetTicketsByHandlerId);
TicketRouter.get('/tickets/:ticketId', handleGetTicketById);
TicketRouter.post('/tickets', handleCreateTicket);
TicketRouter.post('/tickets/:ticketId', upload.single('image'), handleCreateTicketMessagge);
TicketRouter.put('/tickets/:ticketId', handleUpdateTicket);
TicketRouter.delete('/tickets/:ticketId', handleDeleteTicket);

export default TicketRouter;
