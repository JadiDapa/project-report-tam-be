import { Tickets } from '@prisma/client';
import prisma from '../lib/prisma';
import { generateTicketCode } from '../helpers/helper.generate-code';

export const getAllTickets = async () => {
  return await prisma.tickets.findMany({
    include: {
      Requester: true,
      Handler: true
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
      Handler: true
    }
  });
};

export const getTicketsByHandlerId = async (handlerId: string) => {
  return await prisma.tickets.findMany({
    where: {
      handler: parseInt(handlerId)
    },
    include: {
      Requester: true,
      Handler: true
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
      Handler: true
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
