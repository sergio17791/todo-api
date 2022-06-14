
import chai          from 'chai'
import mongoose      from 'mongoose'
import request       from 'supertest'
import {StatusCodes} from 'http-status-codes'
import app           from '../../app'
import {TaskStatus}  from '../../src/types/enum/TaskStatus'

describe('Complete Task e2e tests', () => {

    const pendingTaskId: mongoose.Types.ObjectId   = new mongoose.Types.ObjectId()
    const completedTaskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

    beforeEach(async () => {
        await mongoose.model('Task').create({
            _id: pendingTaskId,
            name: 'Pending task',
            description: 'Pending task description',
            assignee: 'Pending task assignee',
            dueDate: new Date('2022-06-13T17:00:00.000Z'),
            status: TaskStatus.PENDING,
            historic: [{
                status: TaskStatus.PENDING,
                date: new Date()
            }]
        })

        await mongoose.model('Task').create({
            _id: completedTaskId,
            name: 'Completed task',
            description: 'Completed task description',
            assignee: 'Completed task assignee',
            dueDate: new Date('2022-06-14T17:00:00.000Z'),
            status: TaskStatus.COMPLETED,
            historic: [
                {
                    status: TaskStatus.PENDING,
                    date: new Date()
                },
                {
                    status: TaskStatus.COMPLETED,
                    date: new Date()
                }
            ]
        })
    })

    afterEach(async () => {
        await mongoose.model('Task').deleteMany()
    })

    context('when id parameter is invalid', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .put('/task/XXXX/complete')
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when task not found', () => {
        it('should return an error', async () => {
            const notExistentTaskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

            const response = await request(app)
                .put(`/task/${notExistentTaskId}/complete`)
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('NotFound')
            chai.expect(body.message).to.equals(`Task ${notExistentTaskId} not found.`)
        })
    })

    context('when task already completed', () => {
        it('should return an error', async () => {
            const notExistentTaskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

            const response = await request(app)
                .put(`/task/${completedTaskId}/complete`)
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('TaskAlreadyCompleted')
            chai.expect(body.message).to.equals(`Task ${completedTaskId} is already completed.`)
        })
    })

    context('when the task exists and is not completed', () => {
        it('should return a completed task', async () => {
            const notExistentTaskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

            const response = await request(app)
                .put(`/task/${pendingTaskId}/complete`)
                .expect(StatusCodes.OK)

            const body = response.body

            chai.expect(body).to.have.deep.property('id', String(pendingTaskId))
            chai.expect(body.name).to.equals('Pending task')
            chai.expect(body.description).to.equals('Pending task description')
            chai.expect(body.assignee).to.equals('Pending task assignee')
            chai.expect(body.due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(body.status).to.equals(TaskStatus.COMPLETED)
            chai.expect(body.historic).to.be.an('array').with.length(2)
            chai.expect(body.historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(body.historic[0]).to.have.property('date')
            chai.expect(body.historic[1].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(body.historic[1]).to.have.property('date')
            chai.expect(body).to.have.property('created_at')
            chai.expect(body).to.have.property('updated_at')
        })
    })
})