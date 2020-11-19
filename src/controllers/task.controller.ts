import { Request, Response } from 'express';
import { TaskDocument } from '../models/task.model';
import TaskService from '../services/task.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export default class TaskController {
  public static async getByUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const tasks: Array<TaskDocument> = await TaskService.getTaskByUserId(req.user.id);

    res.status(200).json(tasks);
  }

  public static async createOrUpdate(req: AuthenticatedRequest, res: Response): Promise<void> {
    const task: TaskDocument | null = await TaskService.createOrUpdate(req.body);

    res.status(200).json(task);
  }

  public static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    const deleted = await TaskService.deleteById(req.body.id);

    res.status(200).json(deleted);
  }
}
