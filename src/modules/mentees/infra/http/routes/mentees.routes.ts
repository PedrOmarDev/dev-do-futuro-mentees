import { Router } from 'express'

import MenteesController from '../controllers/MenteesController'

const menteesRouter = Router()
const menteesController = new MenteesController()

menteesRouter.get('/', menteesController.index)
menteesRouter.get('/:mentee_id', menteesController.show)
menteesRouter.post('/', menteesController.create)
menteesRouter.put('/:mentee_id', menteesController.update)
menteesRouter.delete('/:mentee_id', menteesController.remove)

export default menteesRouter
