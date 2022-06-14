import {TaskHistoric} from '../../entities/TaskHistoric';
import {TaskStatus}   from '../../types/enum/TaskStatus';

export class UpdateStatusDTO {
    constructor(
        public id: string,
        public status: TaskStatus,
        public historic: TaskHistoric[]
    ) {}
}