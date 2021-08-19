import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import SkillsController from '../controllers/SkillsController'
import { TypeSkill } from '@modules/skills/enums/TypeSkillEnum'

const skillsRouter = Router()
const skillsController = new SkillsController()

skillsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      mode: Joi.valid(...Object.values(TypeSkill)).required(),
    },
  }),
  skillsController.create,
)

export default skillsRouter
