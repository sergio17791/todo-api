import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SortDirection } from '../../../shared/domain/sort-direction.enum';
import { BaseController } from '../../../shared/infrastructure/controllers/base.controller';
import { ListTasksService } from '../../application/list-tasks/list-tasks.service';
import { TaskStatus } from '../../domain/task-status.enum';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';

export class ListTasksController extends BaseController {
  constructor(private _taskRepository: TaskRepository) {
    super();
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    this.validateRequest(request);

    const status: TaskStatus = request.query.status as TaskStatus;
    const name: string = request.query.name as string;
    const assignee: string = request.query.assignee as string;
    const fromDueDateStr: string = request.query.fromDueDate as string;
    const toDueDateStr: string = request.query.toDueDate as string;
    const sortBy: string = request.query.sortBy as string;
    const sortDirection: SortDirection = request.query.sortDirection as SortDirection;

    const fromDueDate: Date | undefined = fromDueDateStr ? new Date(fromDueDateStr) : undefined;
    const toDueDate: Date | undefined = toDueDateStr ? new Date(toDueDateStr) : undefined;

    const tasks: Task[] = await new ListTasksService(this._taskRepository).list({
      name,
      assignee,
      status,
      fromDueDate,
      toDueDate,
      sortBy,
      sortDirection,
    });

    return response.status(StatusCodes.OK).json(tasks);
  }
}
