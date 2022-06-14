import {Document}   from 'mongoose'
import {Schema}     from 'mongoose'
import {Model}      from 'mongoose'
import {model}      from 'mongoose'
import {ITask}      from '../src/interfaces/ITask'
import {TaskStatus} from '../src/types/enum/TaskStatus'


export interface ITaskModel extends ITask, Document {
    id: string
}

const TaskHistoricSchema: Schema = new Schema(
    {
        status: {
            type: String,
            required: true,
            enum: {
                values: Object.values(TaskStatus),
                message: 'The status {VALUE} is not valid.',
            },
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {_id: false, timestamps: false}
)
  
const TaskSchema: Schema = new Schema({
    name:        {type: String, required: true},
    description: {type: String, required: true},
    assignee:    {type: String, required: true},
    dueDate:     {type: Date,   required: true},
    status: {
        type: String,
        required: false,
        enum: {
            values: Object.values(TaskStatus),
            message: 'The status {VALUE} is not valid.',
        },
    },
    historic: {
        type: [TaskHistoricSchema],
        required: true,
    }
}, {timestamps: true})

export const TASK_MODEL_NAME: string = 'Task'
  
export const Task: Model<ITaskModel> = model<ITaskModel>(TASK_MODEL_NAME, TaskSchema)