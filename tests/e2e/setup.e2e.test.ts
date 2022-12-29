import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dotenv from 'dotenv';
import { Express } from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { App } from '../../src/app';
import { AppRouter } from '../../src/app.router';
import { DiContainer } from '../../src/DiContainer';

chai.use(chaiAsPromised);

export const app: Express = new App(new DiContainer().diContainer.resolve<AppRouter>(AppRouter))
  .app;

dotenv.config();

const dbEngine: string | undefined = process.env.DB_ENGINE;
const dbHost: string | undefined = process.env.DB_HOST_TEST;
const dbName: string | undefined = process.env.DB_NAME_TEST;

const databaseUri: string = `${dbEngine}://${dbHost}/${dbName}`;

before(async () => {
  await mongoose.connect(databaseUri);
});

after(async () => {
  await mongoose.disconnect();
});
