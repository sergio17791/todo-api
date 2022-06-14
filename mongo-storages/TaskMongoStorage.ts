import mongoose          from 'mongoose'
import {ITaskModel}      from '../mongo-schemas/task'
import {TASK_MODEL_NAME} from '../mongo-schemas/task'
import {UpdateStatusDTO} from '../src/dtos/tasks/UpdateStatusDTO'
import {CreateTaskDTO}   from '../src/dtos/tasks/CreateTaskDTO'
import {GetByIdDTO}      from '../src/dtos/tasks/GetByIdDTO'
import {ListTasksDTO}    from '../src/dtos/tasks/ListTasksDTO'
import {Task}            from '../src/entities/Task'
import {ITaskStorage}    from '../src/storages/ITaskStorage'

export class TaskMongoStorage implements ITaskStorage {

    private readonly LIST_LIMIT: number = 20

    private _collection: mongoose.Model<ITaskModel>

    constructor() {
        this._collection = mongoose.model(TASK_MODEL_NAME)
    }

    public create(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return new Promise((resolve, reject) => {
            this._collection
                .create(createTaskDTO)
                .then((response: ITaskModel) => {
                    const task: Task = response
                    resolve(task);
                })
        })
    }

    public getById(getByIdDTO: GetByIdDTO): Promise<Task | null> {
        return new Promise((resolve, reject) => {
            this._collection
                .findById(getByIdDTO.id)
                .then((response: ITaskModel | null) => {
                    if (null != response) {
                        const task: Task = response
                        resolve(task);
                    }
                    resolve(null)
                })
        })
    }

    public list(listTasksDTO: ListTasksDTO): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            const query: mongoose.FilterQuery<ITaskModel> = {};

            if (undefined !== listTasksDTO.name) query.name = listTasksDTO.name
            if (undefined !== listTasksDTO.assignee) query.assignee = listTasksDTO.assignee
            if (undefined !== listTasksDTO.status) query.status = listTasksDTO.status

            if (undefined !== listTasksDTO.fromDueDate && undefined !== listTasksDTO.toDueDate)
                query.dueDate = {
                    $gte: listTasksDTO.fromDueDate,
                    $lte: listTasksDTO.toDueDate,
                }
            else if (undefined !== listTasksDTO.fromDueDate && undefined === listTasksDTO.toDueDate)
                query.dueDate = {
                    $gte: listTasksDTO.fromDueDate,
                }
            else if (undefined === listTasksDTO.fromDueDate && undefined !== listTasksDTO.toDueDate)
                query.dueDate = {
                    $lte: listTasksDTO.toDueDate,
                }
        
            const options: mongoose.QueryOptions = {
                sort: {dueDate: 1},
                limit: this.LIST_LIMIT
            }

            this._collection
                .find(query, null, options)
                .then((response: ITaskModel[]) => {
                    if (null != response) {
                        const tasks: Task[] = []
                        response.forEach((row: ITaskModel) => {
                            const task: Task = row
                            tasks.push(task)
                        })
                        resolve(tasks)
                    }

                    resolve([]);
                })
        })
    }

    public updateStatus(updateStatusDTO: UpdateStatusDTO): Promise<Task | null> {
        return new Promise((resolve, reject) => {
            this._collection
                .findByIdAndUpdate(
                    updateStatusDTO.id,
                    {
                        status: updateStatusDTO.status,
                        historic: updateStatusDTO.historic,
                    },
                    {
                        new: true,
                        runValidators: true,
                        omitUndefined: true,
                    },
                )
                .then((response: ITaskModel | null) => {
                    if (null != response) {
                        const task: Task = response
                        resolve(task);
                    }
                    resolve(null)
                })
        })
    }
}