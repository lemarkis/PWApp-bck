import {
  Document,
  Model,
  model,
  Schema,
  Types,
} from 'mongoose';

const ReminderSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

const TaskSchema = new Schema({
  user_id: { type: String, required: true }, // may change (name & type)
  category: { type: String, required: true, enum: ['task', 'meeting'] },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  location: { type: String }, // may change (name)
  reminders: { type: [ReminderSchema] },
  status: { type: String, enum: ['waiting', 'active', 'done'], default: 'waiting' },
});

export interface IReminder {
  name: string;
  date: Date;
}

export interface ITask {
  user_id: string;
  category: string;
  title: string;
  description: string;
  deadline: Date;
  location: string;
  reminders: Array<IReminder>;
  status: string;
}

export interface TaskDocument extends ITask, Document {
  reminders: Types.Array<IReminder>;
}

export interface TaskModel extends Model<TaskDocument> {}

export default model<TaskDocument, TaskModel>('Task', TaskSchema);
