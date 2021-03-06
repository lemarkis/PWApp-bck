import Task, { TaskDocument } from '../models/task.model';

class TaskService {
  public static async getTaskByUserId(id: any): Promise<TaskDocument[]> {
    return Task.find({ user_id: id }).exec();
  }

  public static async getAll(): Promise<TaskDocument[]> {
    return Task.find().select('+user_id').exec();
  }

  public static async deleteById(id: any): Promise<TaskDocument | null> {
    return Task.findByIdAndDelete(id).exec();
  }

  public static async createOrUpdate(task: any): Promise<TaskDocument | null> {
    if (task.id) {
      // eslint-disable-next-line
      delete task._id;
      return Task.findOneAndUpdate(task.id, task /*, { new: true, upsert: true }*/).exec(); // eslint-disable-line
    }
    return Task.create(task);
  }
}

export default TaskService;
