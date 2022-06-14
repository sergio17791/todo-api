import {NextFunction}         from 'express'
import {Request}              from 'express'
import {RequestHandler}       from 'express'
import {Response}             from 'express'
import {Router}               from 'express'
import {body, query, param}   from 'express-validator'
import {CreateTaskController} from '../controllers/tasks/CreateTaskController'
import {ListTasksController}  from '../controllers/tasks/ListTasksController'
import {TaskStatus}           from '../src/types/enum/TaskStatus'

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

router.get('/tasks',
  query(['from_due_date', 'to_due_date'])
    .optional()
    .isISO8601().toDate()
    .withMessage('Parameter must be a date.'),
  query('status')
    .optional()
    .isIn(Object.values(TaskStatus))
    .withMessage('Invalid value.'),
  asyncHandler((request: Request, response: Response) => new ListTasksController().execute(request, response)),
)

export = router