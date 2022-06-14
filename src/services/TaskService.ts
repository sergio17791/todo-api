import { CompleteTaskDTO } from '../dtos/tasks/CompleteTaskDTO'
import {CreateTaskDTO}   from '../dtos/tasks/CreateTaskDTO'
import {ListTasksDTO}    from '../dtos/tasks/ListTasksDTO'
import {UpdateStatusDTO} from '../dtos/tasks/UpdateStatusDTO'
import {Task}            from '../entities/Task'
import {TaskHistoric}    from '../entities/TaskHistoric'
import {ToDoAPIError}    from '../errors/ToDoAPIError'
import {ITaskStorage}    from '../storages/ITaskStorage'
import {TaskStatus}      from '../types/enum/TaskStatus'

export class TaskService {

    constructor(private taskStorage: ITaskStorage) {}

    async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const historic: TaskHistoric[] = []
        historic.push(new TaskHistoric(TaskStatus.PENDING, new Date()))

        createTaskDTO.historic = historic
        createTaskDTO.status   = TaskStatus.PENDING

        return this.taskStorage.create(createTaskDTO)
    }

    async list(listTasksDTO: ListTasksDTO): Promise<Task[]> {
        return this.taskStorage.list(listTasksDTO)
    }

    async complete(completeTaskDTO: CompleteTaskDTO): Promise<Task > {
        const id: string = completeTaskDTO.id
        let task: Task | null = await this.taskStorage.getById({id})

        if (task) {
            if (task.status === TaskStatus.COMPLETED) {
                throw new ToDoAPIError('TaskAlreadyCompleted', `Task ${id} is already completed.`)
            }

            const historic: TaskHistoric[] = task.historic
            historic.push(new TaskHistoric(TaskStatus.COMPLETED, new Date()))

            const status: TaskStatus = TaskStatus.COMPLETED

            task = await this.taskStorage.updateStatus({id, status, historic})

            if (task) {
                return task
            }
        }

        throw new ToDoAPIError('NotFound', `Task ${id} not found.`)
    }
}