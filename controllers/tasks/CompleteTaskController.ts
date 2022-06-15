import { Request } from 'express'
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BaseController } from '../BaseController'
import { Task } from '../../src/entities/Task'
import { TaskService } from '../../src/services/TaskService'
import { TaskMongoStorage } from '../../mongo-storages/TaskMongoStorage'

export class CompleteTaskController extends BaseController {
    public async execute(request: Request, response: Response): Promise<Response> {
        this.validateRequest(request)

        const id: string = request.params.id

        const storage: TaskMongoStorage = new TaskMongoStorage()

        const task: Task = await new TaskService(storage).complete({ id })

        return response.status(StatusCodes.OK).json({
            id: task.id,
            name: task.name,
            description: task.description,
            assignee: task.assignee,
            due_date: task.dueDate,
            status: task.status,
            historic: task.historic,
            created_at: task.createdAt,
            updated_at: task.updatedAt,
        })
    }
}
