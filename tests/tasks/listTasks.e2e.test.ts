
import chai          from 'chai'
import mongoose      from 'mongoose'
import request       from 'supertest'
import {StatusCodes} from 'http-status-codes'
import app           from '../../app'
import {TaskStatus}  from '../../src/types/enum/TaskStatus'

describe('List Tasks e2e tests', () => {

    beforeEach(async () => {
        await mongoose.model('Task').create({
            name: 'First task',
            description: 'First task description',
            assignee: 'First task assignee',
            dueDate: new Date('2022-06-13T17:00:00.000Z'),
            status: TaskStatus.PENDING,
            historic: [{
                status: TaskStatus.PENDING,
                date: new Date()
            }]
        })

        await mongoose.model('Task').create({
            name: 'Second task',
            description: 'Second task description',
            assignee: 'Second task assignee',
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

    context('when to_due_date parameter is not a date', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    to_due_date: 'Wrong date'
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when from_due_date parameter is not a date', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    from_due_date: 'Wrong date'
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when status parameter is not a valid status', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    status: 'INVALID'
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when filter by name parameter', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    name: 'First task'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('First task')
            chai.expect(tasks[0].description).to.equals('First task description')
            chai.expect(tasks[0].assignee).to.equals('First task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(1)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when filter by assignee parameter', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    assignee: 'First task assignee'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('First task')
            chai.expect(tasks[0].description).to.equals('First task description')
            chai.expect(tasks[0].assignee).to.equals('First task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(1)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when filter by status parameter', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    status: TaskStatus.PENDING
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('First task')
            chai.expect(tasks[0].description).to.equals('First task description')
            chai.expect(tasks[0].assignee).to.equals('First task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(1)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when filter by to_due_date parameter', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    to_due_date: '2022-06-13T17:30:00.000Z'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('First task')
            chai.expect(tasks[0].description).to.equals('First task description')
            chai.expect(tasks[0].assignee).to.equals('First task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(1)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when filter by from_due_date parameter', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    from_due_date: '2022-06-13T17:30:00.000Z'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('Second task')
            chai.expect(tasks[0].description).to.equals('Second task description')
            chai.expect(tasks[0].assignee).to.equals('Second task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-14T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(2)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[0].historic[1]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when filter by to_due_date and from_due_date parameters', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    from_due_date: '2022-06-13T17:30:00.000Z',
                    to_due_date:   '2022-06-15T17:30:00.000Z'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(1)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('Second task')
            chai.expect(tasks[0].description).to.equals('Second task description')
            chai.expect(tasks[0].assignee).to.equals('Second task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-14T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(2)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[0].historic[1]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
        })
    })

    context('when no filter parameters', () => {
        it('should return a list', async () => {
            const response = await request(app)
                .get('/tasks')
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(2)

            chai.expect(tasks[0]).to.have.property('id')
            chai.expect(tasks[0].name).to.equals('First task')
            chai.expect(tasks[0].description).to.equals('First task description')
            chai.expect(tasks[0].assignee).to.equals('First task assignee')
            chai.expect(tasks[0].due_date).to.equals('2022-06-13T17:00:00.000Z')
            chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic).to.be.an('array').with.length(1)
            chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[0].historic[0]).to.have.property('date')
            chai.expect(tasks[0]).to.have.property('created_at')
            chai.expect(tasks[0]).to.have.property('updated_at')
            chai.expect(tasks[1]).to.have.property('id')
            chai.expect(tasks[1].name).to.equals('Second task')
            chai.expect(tasks[1].description).to.equals('Second task description')
            chai.expect(tasks[1].assignee).to.equals('Second task assignee')
            chai.expect(tasks[1].due_date).to.equals('2022-06-14T17:00:00.000Z')
            chai.expect(tasks[1].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[1].historic).to.be.an('array').with.length(2)
            chai.expect(tasks[1].historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(tasks[1].historic[0]).to.have.property('date')
            chai.expect(tasks[1].historic[1].status).to.equals(TaskStatus.COMPLETED)
            chai.expect(tasks[1].historic[1]).to.have.property('date')
            chai.expect(tasks[1]).to.have.property('created_at')
            chai.expect(tasks[1]).to.have.property('updated_at')
        })
    })

    context('when no tasks found', () => {
        it('should return an empty list', async () => {
            const response = await request(app)
                .get('/tasks')
                .query({
                    from_due_date: '2022-06-13T18:00:00.000Z',
                    to_due_date:   '2022-06-14T16:00:00.000Z'
                })
                .expect(StatusCodes.OK)

            const tasks = response.body
            chai.expect(tasks).to.be.an('array').with.length(0)
        })
    })
})