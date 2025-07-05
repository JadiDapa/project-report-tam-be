import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Route Imports
import AccountRouter from './routes/route.account';
import ProjectRouter from './routes/route.project';
import ReportRouter from './routes/route.report';
import ReportDiscussionRouter from './routes/route.report-discussion';
import RoleRouter from './routes/route.role';
import FeatureRouter from './routes/route.feature';
import DailyReportRouter from './routes/route.daily-report';
import TicketRouter from './routes/route.ticket';
import prisma from './lib/prisma';
import NotificationRouter from './routes/route.notification';
import TaskRouter from './routes/route.task';
import TaskEvidenceRouter from './routes/route.task-evidence';
import TaskEvidenceImageRouter from './routes/route.task-evidence-image';
import AppSettingRouter from './routes/route.app-setting';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const port = process.env.PORT || 3000;

// Base Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '40mb' }));
app.use(bodyParser.json({ limit: '40mb' }));

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', AccountRouter);
app.use('/api', ProjectRouter);
app.use('/api', ReportRouter);
app.use('/api', ReportDiscussionRouter);
app.use('/api', RoleRouter);
app.use('/api', FeatureRouter);
app.use('/api', DailyReportRouter);
app.use('/api', TicketRouter);
app.use('/api', NotificationRouter);
app.use('/api', TaskRouter);
app.use('/api', TaskEvidenceRouter);
app.use('/api', TaskEvidenceImageRouter);
app.use('/api', AppSettingRouter);

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', async (message) => {
    console.log('Received message:', message);

    // fetch enriched message with Account and Role info
    const fullMessage = await prisma.ticketMessages.findUnique({
      where: { id: message.id },
      include: {
        Account: {
          include: {
            Role: true
          }
        }
      }
    });

    io.emit('new_message', fullMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// App Port Listener
server.listen(Number(port), '0.0.0.0', () => {
  console.log('Server Activated');
  console.log(`http://10.10.11.60:${port}`);
});

export { io };
