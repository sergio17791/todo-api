import { TaskStatus } from './task-status.enum';

export interface TaskHistoricInterface {
  status: TaskStatus;
  date: Date;
}
