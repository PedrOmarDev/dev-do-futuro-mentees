import { container } from 'tsyringe'

import IMenteesRepository from '@modules/mentees/repositories/IMenteesRepository'
import MenteesRepository from '@modules/mentees/infra/typeorm/repositories/MenteesRepository'

import ISkillsRepository from '@modules/skills/repositories/ISkillsRepository'
import SkillsRepository from '@modules/skills/infra/typeorm/repositories/SkillsRepository'

container.registerSingleton<IMenteesRepository>(
  'MenteesRepository',
  MenteesRepository,
)

container.registerSingleton<ISkillsRepository>(
  'SkillsRepository',
  SkillsRepository,
)
