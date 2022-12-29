import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../../shared/infrastructure/controllers/base.controller';
import { CreateTaskService } from '../../application/create-task/create-task.service';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';

export class CreateTaskController extends BaseController {
  constructor(private _taskRepository: TaskRepository) {
    super();
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    this.validateRequest(request);

    const name: string = request.body.name;
    const description: string = request.body.description;
    const assignee: string = request.body.assignee;
    const dueDate: Date = request.body.dueDate;

    const task: Task = await new CreateTaskService(this._taskRepository).create({
      name,
      description,
      assignee,
      dueDate,
    });

    return response.status(StatusCodes.CREATED).json(task);
  }
}
