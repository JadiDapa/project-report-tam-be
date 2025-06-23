import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createTaskEvidence,
  createTasks
} from '../models/model.task';
import ErrorResponse from '../helpers/helper.error';
import SuccessResponse from '../helpers/helper.success';
import { TaskEvidences, Tasks } from '@prisma/client';
import generateDoc from '../helpers/helper.generate-evidences';
import path from 'path';
import { format } from 'date-fns';

export const handleGetAllTasks = async (req: any, res: any) => {
  try {
    const result = await getAllTasks();
    return SuccessResponse.DataFound(req, res, 'All Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGetTaskById = async (req: { params: { taskId: string } }, res: any) => {
  try {
    const taskId = req.params.taskId;
    const result = await getTaskById(taskId);
    return SuccessResponse.DataFound(req, res, 'A Data Found', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleGenerateTaskEvidence = async (req: { params: { taskId: string } }, res: any) => {
  const taskId = req.params.taskId;

  const task = await getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const docData = {
    projectTitle: task.Project.title,
    taskTitle: capitalize(`${task.type} ${task.item} ${task.quantity}`),
    generatedDate: new Date().toLocaleDateString(),
    te: task.TaskEvidences.map((te, i) => {
      return {
        index: i + 1,
        title: capitalize(te.description ?? ''),
        fullname: te.Account?.fullname || 'No Report Yet',
        date: te.image ? format(te.updatedAt, 'dd MMMM yyyy') : '-',
        image: te.image ? `.${new URL(te.image).pathname}` : null
      };
    })
  };

  try {
    const filePath = await generateDoc(
      docData,
      capitalize(`Task Report ${task.type} ${task.item} ${task.quantity}`),
      '../../task_evidence_template.docx'
    );

    if (!filePath) {
      return res.status(500).json({ error: 'Failed to generate document' });
    }

    res.download(filePath, 'report.docx');
    return SuccessResponse.DataFound(
      req,
      res,
      'Docx Created',
      `${process.env.BASE_URL}/uploads/evidences/${path.basename(filePath)}`
    );
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTask = async (req: { body: Tasks }, res: any) => {
  try {
    const data = req.body;

    const result = await createTask(data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTasks = async (req: { body: Tasks[] }, res: any) => {
  try {
    const data = req.body;

    const result = await createTasks(data);
    return SuccessResponse.DataFound(req, res, 'New Datas Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleCreateTaskEvidence = async (
  req: { params: { taskId: string }; body: TaskEvidences; file: Express.Multer.File },
  res: any
) => {
  try {
    const imageFile = req.file.filename;
    const taskId = req.params.taskId;

    const data = { ...req.body, image: process.env.BASE_URL + '/uploads/' + imageFile };

    const result = await createTaskEvidence(taskId, data);
    return SuccessResponse.DataFound(req, res, 'New Data Created', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleUpdateTask = async (
  req: { params: { taskId: string }; body: Tasks },
  res: any
) => {
  try {
    const taskId = req.params.taskId;
    const data = req.body;
    const result = await updateTask(taskId, data);
    return SuccessResponse.DataFound(req, res, 'Existing Data Updated', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

export const handleDeleteTask = async (req: { params: { taskId: string } }, res: any) => {
  try {
    const taskId = req.params.taskId;
    const result = await deleteTask(taskId);
    return SuccessResponse.DataFound(req, res, 'Existing Data Deleted', result);
  } catch (error) {
    return ErrorResponse.InternalServer(req, res, (error as Error).message);
  }
};

const capitalize = (str: string) =>
  str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
