import { SortDirection } from '../../../shared/domain/sort-direction.enum';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';
import { ListTasksDTO } from './list-tasks.dto';

export class ListTasksService {
  constructor(private _taskRepository: TaskRepository) {}

  async list(payload: ListTasksDTO): Promise<Task[]> {
    const filters: Record<string, unknown> = {};
    filters.name = payload.name ?? undefined;
    filters.assignee = payload.assignee ?? undefined;
    filters.status = payload.status ?? undefined;
    filters.fromDueDate = payload.fromDueDate ?? undefined;
    filters.toDueDate = payload.toDueDate ?? undefined;

    const sortBy: string | undefined = payload.sortBy;
    const sortDirection: SortDirection | undefined = payload.sortDirection;
    let sort: Record<string, SortDirection> | undefined = undefined;
    if (sortBy && sortDirection) sort = { [sortBy]: sortDirection };

    return this._taskRepository.list(filters, sort);
  }
}
