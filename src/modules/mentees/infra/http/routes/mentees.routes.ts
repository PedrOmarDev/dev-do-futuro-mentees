import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import MenteesController from '../controllers/MenteesController'

const menteesRouter = Router()
const menteesController = new MenteesController()

menteesRouter.get('/', menteesController.index)
menteesRouter.get('/:mentee_id', menteesController.show)
menteesRouter.post('/', menteesController.create)
menteesRouter.put('/:mentee_id', menteesController.update)

menteesRouter.patch(
  '/skills/:mentee_id',
  celebrate({
    [Segments.PARAMS]: {
      mentee_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      skill_ids: Joi.array().items(Joi.string()).required(),
    },
  }),
  menteesController.updateSkills,
)

menteesRouter.delete('/:mentee_id', menteesController.remove)

export default menteesRouter
