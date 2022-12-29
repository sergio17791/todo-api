import chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { TaskStatus } from '../../../src/tasks/domain/task-status.enum';
import { app } from '../setup.e2e.test';
import { removeAllTasks } from './seed-tasks';

describe('Create Task e2e tests', () => {
  const name: string = 'Task Name';
  const description: string = 'Task Description';
  const assignee: string = 'Task Assignee';
  const dueDateStr: string = new Date().toISOString();

  after(async () => {
    await removeAllTasks();
  });

  context('when name parameter is missing', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          description,
          assignee,
          dueDate: dueDateStr,
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when description parameter is missing', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          name,
          assignee,
          dueDate: dueDateStr,
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when assignee parameter is missing', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          name,
          description,
          dueDate: dueDateStr,
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when dueDate parameter is missing', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          name,
          description,
          assignee,
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when all parameters are correct', () => {
    it('should return a task', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          name,
          description,
          assignee,
          dueDate: dueDateStr,
        })
        .expect(StatusCodes.CREATED);

      const body = response.body;

      chai.expect(body).to.have.property('id');
      chai.expect(body.name).to.equals(name);
      chai.expect(body.description).to.equals(description);
      chai.expect(body.assignee).to.equals(assignee);
      chai.expect(body.dueDate).to.equals(dueDateStr);
      chai.expect(body.status).to.equals(TaskStatus.PENDING);
      chai.expect(body.historic).to.be.an('array').with.length(1);
      chai.expect(body.historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(body.historic[0]).to.have.property('date');
      chai.expect(body).to.have.property('createdAt');
      chai.expect(body).to.have.property('updatedAt');
    });
  });
});
