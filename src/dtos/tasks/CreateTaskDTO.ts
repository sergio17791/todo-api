import { TaskHistoric } from '../../entities/TaskHistoric'
import { TaskStatus } from '../../types/enum/TaskStatus'

export class CreateTaskDTO {
    constructor(
        public name: string,
        public description: string,
        public assignee: string,
        public dueDate: Date,
        public status?: TaskStatus,
        public historic?: TaskHistoric[],
    ) {}
}
