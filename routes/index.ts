import {Request}     from 'express'
import {Response}    from 'express'
import {Router}      from 'express'
import {StatusCodes} from 'http-status-codes';

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json('TO-DO API')
  })

export = router;