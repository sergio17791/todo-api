# ToDo-api
Small API for task management. It allows to create tasks, list the tasks with different filters and mark the tasks as completed. Tasks have a status historic.


The API has been developed following the principles and patterns of **Clean Architecture** using the **ExpressJS** framework, **Typescript** and **MongoDB** as a database. The **InversifyJS** library has been used to invert project dependency control and follow clean architecture patterns. **Supertest**, **mocha**, **chai** are used for tests.

## Deploy
The API uses environment variables via the **dotenv** package. It is necessary to configure the **.env** file. You can use the **.env.dist** file as an example.


The project can be deployed via docker compose with the following command when the **.env** file is ready:
```
docker compose up
```

You can also run the project in development mode by using the following command on your local machine (it will require having a database prepared): 
```
npm run start:dev
```

## Endpoints
The endpoints exposed by the API are the following:
```
[POST] /task
[GET]  /tasks
[PUT]  /task/:id/complete
```

## Testing
A battery of unit tests and end to end tests have been prepared, which are found in the *tests* folder.


**Unit tests have been omitted due to lack of time. Due to this, it has been decided to implement end to end tests only to fully test the API.**


End to end tests require having the database container up. End to end tests can be executed using the following command:
```
npm run test:e2e
```

## Next steps
1. Improve error handling and the response returned when errors occur.
2. Split Docker containers into test, development and production environment.
3. Launch the tests end to end through the containers dedicated to tests.
4. Implement unit tests.
5. Add documentation to the API, for example with *apidocjs*.
6. Use Typescript Paths for imports.
