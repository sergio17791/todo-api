import { TaskStatus } from '../../types/enum/TaskStatus'

export class ListTasksDTO {
    constructor(
        public name?: string,
        public assignee?: string,
        public fromDueDate?: Date,
        public toDueDate?: Date,
        public status?: TaskStatus,
    ) {}
}
