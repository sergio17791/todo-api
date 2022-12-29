import chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { SortDirection } from '../../../src/shared/domain/sort-direction.enum';
import { TaskStatus } from '../../../src/tasks/domain/task-status.enum';
import { app } from '../setup.e2e.test';
import { removeAllTasks, seedTasks } from './seed-tasks';

describe('List Tasks e2e tests', () => {
  before(async () => {
    await seedTasks();
  });

  after(async () => {
    await removeAllTasks();
  });

  context('when toDueDate parameter is not a date', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          toDueDate: 'Wrong date',
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when fromDueDate parameter is not a date', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          fromDueDate: 'Wrong date',
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when status parameter is not a valid status', () => {
    it('should return an error', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          status: 'INVALID',
        })
        .expect(StatusCodes.BAD_REQUEST);

      const body = response.body;

      chai.expect(body.error).to.equals('ValidationError');
      chai.expect(body.message).to.equals('Wrong parameters');
    });
  });

  context('when filter by name parameter', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          name: 'First task',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('First task');
      chai.expect(tasks[0].description).to.equals('First task description');
      chai.expect(tasks[0].assignee).to.equals('First task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when filter by assignee parameter', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          assignee: 'First task assignee',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('First task');
      chai.expect(tasks[0].description).to.equals('First task description');
      chai.expect(tasks[0].assignee).to.equals('First task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when filter by status parameter', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          status: TaskStatus.PENDING,
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('First task');
      chai.expect(tasks[0].description).to.equals('First task description');
      chai.expect(tasks[0].assignee).to.equals('First task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when filter by toDueDate parameter', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          toDueDate: '2022-06-13T17:30:00.000Z',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('First task');
      chai.expect(tasks[0].description).to.equals('First task description');
      chai.expect(tasks[0].assignee).to.equals('First task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when filter by fromDueDate parameter', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          fromDueDate: '2022-06-13T17:30:00.000Z',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('Second task');
      chai.expect(tasks[0].description).to.equals('Second task description');
      chai.expect(tasks[0].assignee).to.equals('Second task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-14T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(2);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic[1]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when filter by toDueDate and fromDueDate parameters', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          fromDueDate: '2022-06-13T17:30:00.000Z',
          toDueDate: '2022-06-15T17:30:00.000Z',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(1);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('Second task');
      chai.expect(tasks[0].description).to.equals('Second task description');
      chai.expect(tasks[0].assignee).to.equals('Second task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-14T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(2);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic[1]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
    });
  });

  context('when no filter parameters', () => {
    it('should return a list', async () => {
      const response = await request(app).get('/tasks').expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(2);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('Second task');
      chai.expect(tasks[0].description).to.equals('Second task description');
      chai.expect(tasks[0].assignee).to.equals('Second task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-14T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(2);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic[1]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
      chai.expect(tasks[1]).to.have.property('id');
      chai.expect(tasks[1].name).to.equals('First task');
      chai.expect(tasks[1].description).to.equals('First task description');
      chai.expect(tasks[1].assignee).to.equals('First task assignee');
      chai.expect(tasks[1].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[1].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[1].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[1].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[1].historic[0]).to.have.property('date');
      chai.expect(tasks[1]).to.have.property('createdAt');
      chai.expect(tasks[1]).to.have.property('updatedAt');
    });
  });

  context('when sort by dueDate in descending direction', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          sortBy: 'dueDate',
          sortDirection: SortDirection.DESC,
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(2);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('Second task');
      chai.expect(tasks[0].description).to.equals('Second task description');
      chai.expect(tasks[0].assignee).to.equals('Second task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-14T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(2);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0].historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[0].historic[1]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
      chai.expect(tasks[1]).to.have.property('id');
      chai.expect(tasks[1].name).to.equals('First task');
      chai.expect(tasks[1].description).to.equals('First task description');
      chai.expect(tasks[1].assignee).to.equals('First task assignee');
      chai.expect(tasks[1].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[1].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[1].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[1].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[1].historic[0]).to.have.property('date');
      chai.expect(tasks[1]).to.have.property('createdAt');
      chai.expect(tasks[1]).to.have.property('updatedAt');
    });
  });

  context('when sort by dueDate in ascending  direction', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          sortBy: 'dueDate',
          sortDirection: SortDirection.ASC,
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(2);

      chai.expect(tasks[0]).to.have.property('id');
      chai.expect(tasks[0].name).to.equals('First task');
      chai.expect(tasks[0].description).to.equals('First task description');
      chai.expect(tasks[0].assignee).to.equals('First task assignee');
      chai.expect(tasks[0].dueDate).to.equals('2022-06-13T17:00:00.000Z');
      chai.expect(tasks[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic).to.be.an('array').with.length(1);
      chai.expect(tasks[0].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[0].historic[0]).to.have.property('date');
      chai.expect(tasks[0]).to.have.property('createdAt');
      chai.expect(tasks[0]).to.have.property('updatedAt');
      chai.expect(tasks[1]).to.have.property('id');
      chai.expect(tasks[1].name).to.equals('Second task');
      chai.expect(tasks[1].description).to.equals('Second task description');
      chai.expect(tasks[1].assignee).to.equals('Second task assignee');
      chai.expect(tasks[1].dueDate).to.equals('2022-06-14T17:00:00.000Z');
      chai.expect(tasks[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[1].historic).to.be.an('array').with.length(2);
      chai.expect(tasks[1].historic[0].status).to.equals(TaskStatus.PENDING);
      chai.expect(tasks[1].historic[0]).to.have.property('date');
      chai.expect(tasks[1].historic[1].status).to.equals(TaskStatus.COMPLETED);
      chai.expect(tasks[1].historic[1]).to.have.property('date');
      chai.expect(tasks[1]).to.have.property('createdAt');
      chai.expect(tasks[1]).to.have.property('updatedAt');
    });
  });

  context('when no tasks found', () => {
    it('should return an empty list', async () => {
      const response = await request(app)
        .get('/tasks')
        .query({
          fromDueDate: '2022-06-13T18:00:00.000Z',
          toDueDate: '2022-06-14T16:00:00.000Z',
        })
        .expect(StatusCodes.OK);

      const tasks = response.body;
      chai.expect(tasks).to.be.an('array').with.length(0);
    });
  });
});
