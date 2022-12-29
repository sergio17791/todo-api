import { SortDirection } from '../../../shared/domain/sort-direction.enum';
import { TaskStatus } from '../../domain/task-status.enum';

export class ListTasksDTO {
  constructor(
    public name?: string,
    public assignee?: string,
    public status?: TaskStatus,
    public fromDueDate?: Date,
    public toDueDate?: Date,
    public sortBy?: string,
    public sortDirection?: SortDirection,
  ) {}
}
