import { TaskStatus } from './task-status.enum';

export class TaskHistoric {
  public constructor(public status: TaskStatus, public date: Date) {}
}
