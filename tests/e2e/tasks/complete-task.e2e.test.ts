import chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { TaskStatus } from '../../../src/tasks/domain/task-status.enum';
import { app } from '../setup.e2e.test';
import {
  COMPLETED_TASK_ID,
  NON_EXISTENT_TASK_ID,
  PENDING_TASK_ID,
  removeAllTasks,
  seedTasks,
} from './seed-tasks';

describe('Complete Task e2e tests', () => {
  before(async () => {
    await seedTasks();
  });

  after(async () => {
    await removeAllTasks();
  });

  context('when id parameter is invalid', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .put('/tasks//XXXX/complete')
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when task not found', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .put(`/tasks/${NON_EXISTENT_TASK_ID}/complete`)
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('NotFound');
      chai.expect(body.message).to.equals(`Task ${NON_EXISTENT_TASK_ID} not found.`);
    });
  });

  context('when task already completed', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .put(`/tasks/${COMPLETED_TASK_ID}/complete`)
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('TaskAlreadyCompleted');
      chai.expect(body.message).to.equals(`Task ${COMPLETED_TASK_ID} is already completed.`);
    });
  });

  context('when the task exists and is not completed', () => {
    it('should return a completed task', async () => {
      const response = await request(app)
        .put(`/tasks/${PENDING_TASK_ID}/complete`)
        .expect(StatusCodes.OK);

      const body = response.body;

      chai.expect(body).to.have.deep.property('id', String(PENDING_TASK_ID));
      chai.expect(body.name).to.equals('First task');
      chai.expect(body.description).to.equals('First task description');
      chai.expect(body.assignee).to.equals('First task assignee');
      chai.expect(body.dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(body.status).to.equals(TaskStatus.COMPLETED);
      chai.expect(body.historic).to.be.an('array').with.length(2);
      chai.expect(body.historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(body.historic[0]).to.have.property('date');
      chai.expect(body.historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(body.historic[1]).to.have.property('date');
      chai.expect(body).to.have.property('createdAt');
      chai.expect(body).to.have.property('updatedAt');
    });
  });
});
