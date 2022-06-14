import {IController}       from './IController'
import {Request, Response} from 'express'
import {validationResult}  from 'express-validator'
import {ToDoAPIError}      from '../src/errors/ToDoAPIError'

export abstract class BaseController implements IController {
    abstract execute(request: Request, response: Response): Promise<Response>

    protected validateRequest(request: Request): void {
        const validationErrors = validationResult(request)
        if (!validationErrors.isEmpty()) {
            throw new ToDoAPIError('ValidationError', 'Wrong parameters')
        }
    }
}