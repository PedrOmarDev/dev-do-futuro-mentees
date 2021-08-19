import { Router } from 'express'

import menteesRouter from '@modules/mentees/infra/http/routes/mentees.routes'
import skillsRouter from '@modules/skills/infra/http/routes/skills.routes'

const routes = Router()

routes.use('/mentees', menteesRouter)
routes.use('/skills', skillsRouter)

export default routes
