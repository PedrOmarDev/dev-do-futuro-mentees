import { container } from 'tsyringe'

import IMenteesRepository from '@modules/mentees/repositories/IMenteesRepository'
import MenteesRepository from '@modules/mentees/infra/typeorm/repositories/MenteesRepository'

container.registerSingleton<IMenteesRepository>(
  'MenteesRepository',
  MenteesRepository,
)
