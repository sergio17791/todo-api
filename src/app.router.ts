import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TaskRepository } from './tasks/domain/task.repository';
import { TaskRouter } from './tasks/infrastructure/routes/task.router';

@injectable()
export class AppRouter {
  public router: Router;

  constructor(@inject('TaskRepository') private _taskRepository: TaskRepository) {
    this.router = Router();
    this._configure();
  }

  private _configure(): void {
    this.router.use('/tasks', new TaskRouter(this._taskRepository).router);
  }
}
