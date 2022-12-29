import { SortDirection } from '../../shared/domain/sort-direction.enum';
import { Task } from './task.entity';

export interface TaskRepository {
  create(task: Partial<Task>): Promise<Task>;

  get(id: string): Promise<Task | null>;

  list(
    filters: Record<string, unknown>,
    sort: Record<string, SortDirection> | undefined,
  ): Promise<Task[]>;

  update(id: string, task: Partial<Task>): Promise<Task | null>;
}
