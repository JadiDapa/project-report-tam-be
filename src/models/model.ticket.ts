import { TicketMessages, Tickets } from '@prisma/client';
import prisma from '../lib/prisma';
import { generateTicketCode } from '../helpers/helper.generate-code';

export const getAllTickets = async () => {
  return await prisma.tickets.findMany({
    include: {
      Requester: true,
      Handler: true,
      TicketMessages: {
        include: {
          Account: { include: { Role: true } }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTicketsByRequesterId = async (requesterId: string) => {
  return await prisma.tickets.findMany({
    where: {
      requester: parseInt(requesterId)
    },
    include: {
      Requester: true,
      Handler: true,
      TicketMessages: {
        include: {
          Account: { include: { Role: true } }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTicketsByHandlerId = async (handlerId: string) => {
  return await prisma.tickets.findMany({
    where: {
      handler: parseInt(handlerId)
    },
    include: {
      Requester: { include: { Role: true } },
      Handler: { include: { Role: true } },
      TicketMessages: {
        include: {
          Account: { include: { Role: true } }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTicketById = async (id: string) => {
  return await prisma.tickets.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      Requester: true,
      Handler: true,
      TicketMessages: {
        include: {
          Account: { include: { Role: true } }
        }
      }
    }
  });
};

export const createTicket = async (data: Tickets) => {
  const ticket = await prisma.tickets.create({
    data: {
      ...data,
      code: 'TEMP'
    }
  });

  const code = generateTicketCode(ticket.id);

  const updatedTicket = await prisma.tickets.update({
    where: { id: ticket.id },
    data: { code }
  });

  return updatedTicket;
};

export const createTicketMessage = async (id: string, data: TicketMessages) => {
  return await prisma.ticketMessages.create({
    data: {
      content: data.content,
      ticketId: parseInt(id),
      accountId: Number(data.accountId),
      image: data.image ? data.image : null,
      type: data.type
    }
  });
};

export const updateTicket = async (id: string, data: Tickets) => {
  return await prisma.tickets.update({
    where: {
      id: parseInt(id)
    },
    data: data
  });
};

export const deleteTicket = async (id: string) => {
  return await prisma.tickets.delete({
    where: {
      id: parseInt(id)
    }
  });
};
