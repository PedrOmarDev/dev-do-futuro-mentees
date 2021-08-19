import { getRepository, Repository } from 'typeorm'

import ISkillsRepository from '@modules/skills/repositories/ISkillsRepository'
import Skill from '../entities/Skill'
import ICreateSkillDTO from '@modules/skills/dtos/ICreateSkillDTO'

export default class SkillsRepository implements ISkillsRepository {
  private ormRepository: Repository<Skill>

  constructor() {
    this.ormRepository = getRepository(Skill)
  }

  async findById(skill_id: string): Promise<Skill | undefined> {
    const skill = await this.ormRepository.findOne(skill_id)

    return skill
  }

  async findByName(name: string): Promise<Skill | undefined> {
    const skill = await this.ormRepository.findOne({
      where: { name },
    })

    return skill
  }

  async create({ name, mode }: ICreateSkillDTO): Promise<Skill> {
    const skill = this.ormRepository.create({
      name,
      mode,
    })

    await this.ormRepository.save(skill)

    return skill
  }
}
