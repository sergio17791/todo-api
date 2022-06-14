import {TaskStatus} from '../types/enum/TaskStatus'

export interface ITaskHistoric {
    status: TaskStatus
    date: Date
}