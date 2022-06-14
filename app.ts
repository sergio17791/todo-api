import express       from 'express'
import routes        from './routes'
import {StatusCodes} from 'http-status-codes'

const app: express.Express = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

require('./mongo-schemas/task')

app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (error.name) {
        return response.status(StatusCodes.BAD_REQUEST).send({
            error: error.name,
            message: error.message,
        })
    } else {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: 'InternalServerError',
            message: 'Something is wrong',
        })
        next(error)
    }
})

export default app