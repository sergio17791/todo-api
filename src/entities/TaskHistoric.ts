import { ITaskHistoric } from '../interfaces/ITaskHistoric'
import { TaskStatus } from '../types/enum/TaskStatus'

export class TaskHistoric implements ITaskHistoric {
    public constructor(public status: TaskStatus, public date: Date) {}
}
