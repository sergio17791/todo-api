import {NextFunction}         from 'express'
import {Request}              from 'express'
import {RequestHandler}       from 'express'
import {Response}             from 'express'
import {Router}               from 'express'
import {body, query, param}   from 'express-validator'
import {StatusCodes}          from 'http-status-codes'
import {CreateTaskController} from '../controllers/tasks/CreateTaskController'

const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

const router: Router = Router()

router.post('/task',
  body(['name', 'description', 'assignee', 'due_date'])
    .exists({checkNull: true})
    .withMessage('Parameter is mandatory.'),
  asyncHandler((request: Request, response: Response) => new CreateTaskController().execute(request, response)),
)

export = router