import { Request, Response, Router } from 'express';
import { body, param, query } from 'express-validator';
import asyncHandler from '../../../shared/infrastructure/middlewares/express-async-handler';
import { TaskStatus } from '../../domain/task-status.enum';
import { TaskRepository } from '../../domain/task.repository';
import { CompleteTaskController } from '../controllers/complete-task.controller';
import { CreateTaskController } from '../controllers/create-task.controller';
import { ListTasksController } from '../controllers/list-tasks.controller';

export class TaskRouter {
  public router: Router;

  constructor(private _taskRepository: TaskRepository) {
    this.router = Router();
    this._configure();
  }

  private _configure(): void {
    this.router.post(
      '/',
      body(['name', 'description', 'assignee', 'dueDate'])
        .exists({ checkNull: true })
        .withMessage('Parameter is mandatory.'),
      body(['dueDate']).isISO8601().toDate().withMessage('Parameter must be a date.'),
      asyncHandler((request: Request, response: Response) =>
        new CreateTaskController(this._taskRepository).execute(request, response),
      ),
    );

    this.router.get(
      '/',
      query(['fromDueDate'])
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Parameter must be a date.'),
      query(['toDueDate']).optional().isISO8601().toDate().withMessage('Parameter must be a date.'),
      query('status').optional().isIn(Object.values(TaskStatus)).withMessage('Invalid value.'),
      asyncHandler((request: Request, response: Response) =>
        new ListTasksController(this._taskRepository).execute(request, response),
      ),
    );

    this.router.put(
      '/:id/complete',
      param('id').isMongoId().withMessage('Invalid task ID.'),
      asyncHandler((request: Request, response: Response) =>
        new CompleteTaskController(this._taskRepository).execute(request, response),
      ),
    );
  }
}
