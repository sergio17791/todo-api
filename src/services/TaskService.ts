import {CreateTaskDTO}  from '../dtos/tasks/CreateTaskDTO'
import {ListTasksDTO}    from '../dtos/tasks/ListTasksDTO'
import {Task}           from '../entities/Task'
import { TaskHistoric } from '../entities/TaskHistoric'
import {ITaskStorage}   from '../storages/ITaskStorage'
import {TaskStatus}     from '../types/enum/TaskStatus'

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
}