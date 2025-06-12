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

const TicketRouter = Router();

TicketRouter.get('/tickets', handleGetAllTickets);
TicketRouter.get('/tickets/requester/:accountId', handleGetTicketsByRequesterId);
TicketRouter.get('/tickets/handler/:accountId', handleGetTicketsByHandlerId);
TicketRouter.get('/tickets/:ticketId', handleGetTicketById);
TicketRouter.post('/tickets', handleCreateTicket);
TicketRouter.post('/tickets/:ticketId', handleCreateTicketMessagge);
TicketRouter.put('/tickets/:ticketId', handleUpdateTicket);
TicketRouter.delete('/tickets/:ticketId', handleDeleteTicket);

export default TicketRouter;
