import { Container } from 'inversify';
import { AppRouter } from './app.router';
import { TaskRepository } from './tasks/domain/task.repository';
import { TaskMongoRepository } from './tasks/infrastructure/mongo/task-mongo.repository';

export class DiContainer {
  public diContainer: Container;

  constructor() {
    this.diContainer = new Container();
    this.configure();
  }

  public configure() {
    this.diContainer
      .bind<TaskRepository>('TaskRepository')
      .to(TaskMongoRepository)
      .inSingletonScope();

    this.diContainer.bind(AppRouter).to(AppRouter).inSingletonScope();
  }
}
