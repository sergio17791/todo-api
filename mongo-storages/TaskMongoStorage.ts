import mongoose          from 'mongoose'
import {ITaskModel}      from '../mongo-schemas/task'
import {TASK_MODEL_NAME} from '../mongo-schemas/task'
import {CreateTaskDTO}   from '../src/dtos/tasks/CreateTaskDTO'
import {Task}            from '../src/entities/Task'
import {ITaskStorage}    from '../src/storages/ITaskStorage'

export class TaskMongoStorage implements ITaskStorage {

    private _collection: mongoose.Model<ITaskModel>

    constructor() {
        this._collection = mongoose.model(TASK_MODEL_NAME)
    }

    public create(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this._collection.create(createTaskDTO)
    }
}