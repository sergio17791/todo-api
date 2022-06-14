import {UpdateStatusDTO} from '../dtos/tasks/UpdateStatusDTO'
import {CreateTaskDTO}   from '../dtos/tasks/CreateTaskDTO'
import {GetByIdDTO}      from '../dtos/tasks/GetByIdDTO'
import {ListTasksDTO}    from '../dtos/tasks/ListTasksDTO'
import {Task}            from '../entities/Task'

export interface ITaskStorage {
    create(createTaskDTO: CreateTaskDTO): Promise<Task>

    getById(getByIdDTO: GetByIdDTO): Promise<Task | null>

    list(listTasksDTO: ListTasksDTO): Promise<Task[]>

    updateStatus(updateStatusDTO: UpdateStatusDTO): Promise<Task | null>
}