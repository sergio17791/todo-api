import mongoose from 'mongoose';
import { TaskStatus } from '../../../src/tasks/domain/task-status.enum';

export const NON_EXISTENT_TASK_ID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
export const PENDING_TASK_ID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
export const COMPLETED_TASK_ID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();

export const seedTasks = async () => {
  await mongoose.model('Task').create({
    _id: PENDING_TASK_ID,
    name: 'First task',
    description: 'First task description',
    assignee: 'First task assignee',
    dueDate: new Date('2022-06-13T17:00:00.000Z'),
    status: TaskStatus.PENDING,
    historic: [
      {
        status: TaskStatus.PENDING,
        date: new Date(),
      },
    ],
  });

  await mongoose.model('Task').create({
    _id: COMPLETED_TASK_ID,
    name: 'Second task',
    description: 'Second task description',
    assignee: 'Second task assignee',
    dueDate: new Date('2022-06-14T17:00:00.000Z'),
    status: TaskStatus.COMPLETED,
    historic: [
      {
        status: TaskStatus.PENDING,
        date: new Date(),
      },
      {
        status: TaskStatus.COMPLETED,
        date: new Date(),
      },
    ],
  });
};

export const removeAllTasks = async () => {
  await mongoose.model('Task').deleteMany();
};
