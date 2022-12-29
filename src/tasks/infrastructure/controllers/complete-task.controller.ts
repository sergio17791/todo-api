import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../../shared/infrastructure/controllers/base.controller';
import { CompleteTaskService } from '../../application/complete-task/complete-task.service';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';

export class CompleteTaskController extends BaseController {
  constructor(private _taskRepository: TaskRepository) {
    super();
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    this.validateRequest(request);

    const id: string = request.params.id;

    const task: Task = await new CompleteTaskService(this._taskRepository).complete({ id });

    return response.status(StatusCodes.OK).json(task);
  }
}
