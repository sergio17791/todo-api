import {Request}          from 'express'
import {Response}         from 'express'
import {StatusCodes}      from 'http-status-codes'
import {BaseController}   from '../BaseController'
import {Task}             from '../../src/entities/Task'
import {TaskService}      from '../../src/services/TaskService'
import {TaskStatus}       from '../../src/types/enum/TaskStatus'
import {TaskMongoStorage} from '../../mongo-storages/TaskMongoStorage'

export class ListTasksController extends BaseController {
    public async execute(request: Request, response: Response): Promise<Response> {
        this.validateRequest(request)

        const status: TaskStatus     = request.query.status as TaskStatus
        const name: string           = request.query.name as string
        const assignee: string       = request.query.assignee as string
        const fromDueDateStr: string = request.query.from_due_date as string
        const toDueDateStr: string   = request.query.to_due_date as string

        const fromDueDate: Date | undefined = fromDueDateStr ? new Date(fromDueDateStr) : undefined
        const toDueDate: Date | undefined = toDueDateStr ? new Date(toDueDateStr) : undefined

        const storage: TaskMongoStorage = new TaskMongoStorage()

        const tasks: Task[] = await new TaskService(storage).list({
            status,
            name,
            assignee,
            fromDueDate,
            toDueDate,
        })

        const tasksFormatted = tasks.map((task) => {
            return {
                id:          task.id,
                name:        task.name,
                description: task.description,
                assignee:    task.assignee,
                due_date:    task.dueDate,
                status:      task.status,
                historic:    task.historic 
            }
        })

        return response.status(StatusCodes.OK).json(tasksFormatted)
    }
}