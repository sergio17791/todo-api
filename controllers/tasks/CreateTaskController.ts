import {Request}          from 'express'
import {Response}         from 'express';
import {StatusCodes}      from 'http-status-codes';
import {BaseController}   from '../BaseController'
import {Task}             from '../../src/entities/Task';
import {TaskService}      from '../../src/services/TaskService';
import {TaskMongoStorage} from '../../mongo-storages/TaskMongoStorage';

export class CreateTaskController extends BaseController {
    public async execute(request: Request, response: Response): Promise<Response> {
        this.validateRequest(request)

        const name: string        = request.body.name
        const description: string = request.body.description
        const assignee: string    = request.body.assignee
        const dueDate: Date       = request.body.due_date

        const storage: TaskMongoStorage = new TaskMongoStorage()

        const task: Task = await new TaskService(storage).create({
            name,
            description,
            assignee,
            dueDate,
        })

        return response.status(StatusCodes.CREATED).json({
            id:          task.id,
            name:        task.name,
            description: task.description,
            assignee:    task.assignee,
            due_date:    task.dueDate,
            status:      task.status,
            historic:    task.historic
        })
    }
}