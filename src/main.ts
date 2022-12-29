import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { App } from './app';
import { AppRouter } from './app.router';
import { DiContainer } from './DiContainer';

dotenv.config();

const serverPort: string | undefined = process.env.SERVER_PORT;
const dbEngine: string | undefined = process.env.DB_ENGINE;
const dbHost: string | undefined = process.env.DB_HOST;
const dbName: string | undefined = process.env.DB_NAME;

const databaseUri: string = `${dbEngine}://${dbHost}/${dbName}`;

mongoose.connect(databaseUri);

const app = new App(new DiContainer().diContainer.resolve<AppRouter>(AppRouter)).app;

app.listen(serverPort, () => {
  console.log(`Magic happens in port ${serverPort}`);
});
