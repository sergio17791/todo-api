import {ITaskHistoric} from './ITaskHistoric'
import {TaskStatus}    from '../types/enum/TaskStatus'

export interface ITask {
    id: string
    name: string
    description: string
    assignee: string
    dueDate: Date
    status: TaskStatus
    historic: ITaskHistoric[]
    createdAt: Date
    updatedAt: Date
}