import { Request, Response } from 'express';

export interface ControllerInterface {
  execute(request: Request, response: Response): Promise<Response>;
}
