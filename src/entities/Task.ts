import { TaskHistoric } from './TaskHistoric'
import { ITask } from '../interfaces/ITask'
import { TaskStatus } from '../types/enum/TaskStatus'

export class Task implements ITask {
    public constructor(
        public id: string,
        public name: string,
        public description: string,
        public assignee: string,
        public dueDate: Date,
        public status: TaskStatus,
        public historic: TaskHistoric[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
