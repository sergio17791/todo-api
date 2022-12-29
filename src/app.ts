import express, { Express } from 'express';
import { AppRouter } from './app.router';
import { errorMiddleware } from './shared/infrastructure/middlewares/error-middleware';

export class App {
  public app: Express;

  constructor(private _appRouter: AppRouter) {
    this.app = express();
    this._configureMiddlewares();
    this._configureRoutes();
    this._configureErrorMiddlewares();
  }

  private _configureMiddlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private _configureErrorMiddlewares(): void {
    this.app.use(errorMiddleware);
  }

  private _configureRoutes(): void {
    this.app.use(this._appRouter.router);
  }
}
