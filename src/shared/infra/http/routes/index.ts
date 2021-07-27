import { Router } from 'express'

import menteesRouter from '@modules/mentees/infra/http/routes/mentees.routes'

const routes = Router()

routes.use('/mentees', menteesRouter)

export default routes
