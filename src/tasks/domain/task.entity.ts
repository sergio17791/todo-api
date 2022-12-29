import { TaskHistoric } from './task-historic.entity';
import { TaskStatus } from './task-status.enum';
import { TaskInterface } from './task.interface';

export class Task implements TaskInterface {
  public constructor(
    public id: string,
    public name: string,
    public description: string,
    public assignee: string,
    public dueDate: Date,
    public status: TaskStatus,
    public historic: TaskHistoric[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
