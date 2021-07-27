import { Router } from 'express'

import MenteesController from '../controllers/MenteesController'

const menteesRouter = Router()
const menteesController = new MenteesController()

menteesRouter.get('/', menteesController.index)

export default menteesRouter
