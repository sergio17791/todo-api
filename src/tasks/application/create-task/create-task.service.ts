import { TaskHistoric } from '../../domain/task-historic.entity';
import { TaskStatus } from '../../domain/task-status.enum';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';
import { CreateTaskDTO } from './create-task.dto';

export class CreateTaskService {
  constructor(private _taskRepository: TaskRepository) {}

  async create(payload: CreateTaskDTO): Promise<Task> {
    const historic: TaskHistoric[] = [
      {
        status: TaskStatus.PENDING,
        date: new Date(),
      },
    ];

    return this._taskRepository.create({
      ...payload,
      historic,
      status: TaskStatus.PENDING,
    });
  }
}
