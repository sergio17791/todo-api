import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ToDoAPIError } from '../../domain/todo-api.error';
import { ControllerInterface } from './controller.interface';

export abstract class BaseController implements ControllerInterface {
  abstract execute(request: Request, response: Response): Promise<Response>;

  protected validateRequest(request: Request): void {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      throw new ToDoAPIError('ValidationError', 'Wrong parameters');
    }
  }
}
