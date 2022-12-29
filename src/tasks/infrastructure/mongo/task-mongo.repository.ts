import { injectable } from 'inversify';
import mongoose, { FilterQuery, QueryOptions } from 'mongoose';
import { SortDirection } from '../../../shared/domain/sort-direction.enum';
import { Task } from '../../domain/task.entity';
import { TaskRepository } from '../../domain/task.repository';
import { TaskModelInterface, TASK_MODEL_NAME } from './task-model';

@injectable()
export class TaskMongoRepository implements TaskRepository {
  private _collection: mongoose.Model<TaskModelInterface>;

  constructor() {
    this._collection = mongoose.model(TASK_MODEL_NAME);
  }

  public create(task: Partial<Task>): Promise<Task> {
    return new Promise((resolve) => {
      this._collection.create(task).then((response: TaskModelInterface) => {
        const task: Task = this._transformToEntity(response);
        resolve(task);
      });
    });
  }

  public get(id: string): Promise<Task | null> {
    return new Promise((resolve) => {
      this._collection.findById(id).then((response: TaskModelInterface | null) => {
        const task: Task | null = response ? this._transformToEntity(response) : null;
        resolve(task);
      });
    });
  }

  public list(
    filters: Record<string, unknown> = {},
    sort: Record<string, SortDirection> | undefined = { dueDate: SortDirection.DESC },
  ): Promise<Task[]> {
    const query: FilterQuery<TaskModelInterface> = {};

    if (undefined !== filters.name) query.name = filters.name;
    if (undefined !== filters.assignee) query.assignee = filters.assignee;
    if (undefined !== filters.status) query.status = filters.status;

    if (undefined !== filters.fromDueDate && undefined !== filters.toDueDate)
      query.dueDate = {
        $gte: filters.fromDueDate,
        $lte: filters.toDueDate,
      };
    else if (undefined !== filters.fromDueDate && undefined === filters.toDueDate)
      query.dueDate = {
        $gte: filters.fromDueDate,
      };
    else if (undefined === filters.fromDueDate && undefined !== filters.toDueDate)
      query.dueDate = {
        $lte: filters.toDueDate,
      };

    const options: QueryOptions = { sort };

    return new Promise((resolve) => {
      this._collection.find(query, null, options).then((responseList: TaskModelInterface[]) => {
        const tasks: Task[] = responseList.map((response) => this._transformToEntity(response));
        resolve(tasks);
      });
    });
  }

  public update(id: string, task: Partial<Task>): Promise<Task | null> {
    return new Promise((resolve) => {
      this._collection
        .findByIdAndUpdate(id, task, {
          new: true,
          runValidators: true,
          omitUndefined: true,
        })
        .then((response: TaskModelInterface | null) => {
          const task: Task | null = response ? this._transformToEntity(response) : null;
          resolve(task);
        });
    });
  }

  private _transformToEntity(response: TaskModelInterface): Task {
    return new Task(
      response.id,
      response.name,
      response.description,
      response.assignee,
      response.dueDate,
      response.status,
      response.historic,
      response.createdAt,
      response.updatedAt,
    );
  }
}
