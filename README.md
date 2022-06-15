# ToDo-api
Small API for task management. It allows to create tasks, list the tasks with different filters and mark the tasks as completed. Tasks have a status historic.


The API has been developed using the **ExpressJS** framework, **Typescript** and **MongoDB** as a database. **Supertest**, **mocha**, **chai** and **MongoDBMemoryServer** are used for end to end tests.


The API uses environment variables via the **dotenv** package. It is necessary to configure the **.env** file. You can use the **.env.dist** file as an example.

The project can be deployed via docker-compose with the following command:
```
sudo docker-compose up
```

The API endpoints are:
```
[POST] /task
[GET]  /tasks
[PUT]  /task/:id/complete
```


