import { inject, injectable } from 'tsyringe'

import Mentee from '../infra/typeorm/entities/Mentee'
import IMenteesRepository from '../repositories/IMenteesRepository'
import ISkillsRepository from '@modules/skills/repositories/ISkillsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  mentee_id: string
  skill_ids: string[]
}

@injectable()
export default class UpdateMenteeSkillsService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,

    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  public async execute({ mentee_id, skill_ids }: IRequest): Promise<Mentee> {
    const mentee = await this.menteesRepository.findById(mentee_id)

    if (!mentee) throw new AppError('Mentee not found', 404)

    mentee.skills = []

    for (const skill_id of skill_ids) {
      const skill = await this.skillsRepository.findById(skill_id)

      if (!skill) throw new AppError('Skill not found', 404)

      mentee.skills.push(skill)
    }

    await this.menteesRepository.update(mentee)

    return mentee
  }
}
