import { ToDoAPIError } from '../../../shared/domain/todo-api.error';
import { TaskHistoric } from '../../domain/task-historic.entity';
import { TaskStatus } from '../../domain/task-status.enum';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';
import { CompleteTaskDTO } from './complete-task.dto';

export class CompleteTaskService {
  constructor(private _taskRepository: TaskRepository) {}

  async complete(payload: CompleteTaskDTO): Promise<Task> {
    const id: string = payload.id;
    let task: Task | null = await this._taskRepository.get(id);

    if (task) {
      if (task.status === TaskStatus.COMPLETED) {
        throw new ToDoAPIError('TaskAlreadyCompleted', `Task ${id} is already completed.`);
      }

      const status: TaskStatus = TaskStatus.COMPLETED;

      const historic: TaskHistoric[] = task.historic;
      historic.push({ status, date: new Date() });

      task = await this._taskRepository.update(id, { status, historic });

      if (task) {
        return task;
      }
    }

    throw new ToDoAPIError('NotFound', `Task ${id} not found.`);
  }
}
