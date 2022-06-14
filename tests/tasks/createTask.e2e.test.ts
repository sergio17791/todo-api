
import chai          from 'chai'
import mongoose      from 'mongoose'
import request       from 'supertest'
import {StatusCodes} from 'http-status-codes'
import app           from '../../app'
import {TaskStatus}  from '../../src/types/enum/TaskStatus'

describe('Create Task e2e tests', () => {

    const name: string        = 'Task Name'
    const description: string = 'Task Description'
    const assignee: string    = 'Task Assignee'
    const dueDate: Date       = new Date() 

    context('when name parameter is missing', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .post('/task')
                .send({
                    description,
                    assignee,
                    due_date: dueDate
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when description parameter is missing', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .post('/task')
                .send({
                    name,
                    assignee,
                    due_date: dueDate
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when assignee parameter is missing', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .post('/task')
                .send({
                    name,
                    description,
                    due_date: dueDate
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when dueDate parameter is missing', () => {
        it('should return an error', async () => {
            const response = await request(app)
                .post('/task')
                .send({
                    name,
                    description,
                    assignee,
                })
                .expect(StatusCodes.BAD_REQUEST)

            const body = response.body

            chai.expect(body.error).to.equals('ValidationError')
            chai.expect(body.message).to.equals('Wrong parameters')
        })
    })

    context('when all parameters are correct', () => {

        afterEach(async () => {
            await mongoose.model('Task').deleteMany()
        })

        it('should return a task', async () => {
            const response = await request(app)
                .post('/task')
                .send({
                    name,
                    description,
                    assignee,
                    due_date: dueDate
                })
                .expect(StatusCodes.CREATED)

            const body = response.body

            chai.expect(body).to.have.property('id')
            chai.expect(body.name).to.equals(name)
            chai.expect(body.description).to.equals(description)
            chai.expect(body.assignee).to.equals(assignee)
            chai.expect(body.due_date).to.equals(dueDate.toISOString())
            chai.expect(body.status).to.equals(TaskStatus.PENDING)
            chai.expect(body.historic).to.be.an('array').with.length(1)
            chai.expect(body.historic[0].status).to.equals(TaskStatus.PENDING)
            chai.expect(body.historic[0]).to.have.property('date')
            chai.expect(body).to.have.property('created_at')
            chai.expect(body).to.have.property('updated_at')
        })
    })
})