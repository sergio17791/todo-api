import { TaskHistoricInterface } from './task-historic.interface';
import { TaskStatus } from './task-status.enum';

export interface TaskInterface {
  id: string;
  name: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: TaskStatus;
  historic: TaskHistoricInterface[];
  createdAt: Date;
  updatedAt: Date;
}
