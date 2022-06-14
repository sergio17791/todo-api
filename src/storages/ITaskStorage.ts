import {CreateTaskDTO} from '../dtos/tasks/CreateTaskDTO'
import {ListTasksDTO}  from '../dtos/tasks/ListTasksDTO'
import {Task}          from '../entities/Task'

export interface ITaskStorage {
    create(createTaskDTO: CreateTaskDTO): Promise<Task>

    list(listTasksDTO: ListTasksDTO): Promise<Task[]>
}