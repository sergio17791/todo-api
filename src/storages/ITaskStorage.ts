import {CreateTaskDTO} from '../dtos/tasks/CreateTaskDTO'
import {Task}          from '../entities/Task'

export interface ITaskStorage {
    create(createTaskDTO: CreateTaskDTO): Promise<Task>
}