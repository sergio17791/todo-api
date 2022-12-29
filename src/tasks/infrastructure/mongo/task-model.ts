import { Document, Model, model, Schema } from 'mongoose';
import { TaskStatus } from '../../domain/task-status.enum';
import { TaskInterface } from '../../domain/task.interface';

export interface TaskModelInterface extends TaskInterface, Document {
  id: string;
}

const TaskHistoricSchema: Schema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: {
        values: Object.values(TaskStatus),
        message: 'The status {VALUE} is not valid.',
      },
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false, timestamps: false },
);

const TaskSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      required: false,
      enum: {
        values: Object.values(TaskStatus),
        message: 'The status {VALUE} is not valid.',
      },
    },
    historic: {
      type: [TaskHistoricSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export const TASK_MODEL_NAME: string = 'Task';

export const Task: Model<TaskModelInterface> = model<TaskModelInterface>(
  TASK_MODEL_NAME,
  TaskSchema,
);
