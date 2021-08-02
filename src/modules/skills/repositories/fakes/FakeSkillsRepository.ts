import { v4 as uuid } from 'uuid'

import ICreateSkillDTO from '@modules/skills/dtos/ICreateSkillDTO'
import Skill from '@modules/skills/infra/typeorm/entities/Skill'
import ISkillsRepository from '../ISkillsRepository'

export default class FakeSkillsRepository implements ISkillsRepository {
  private skills: Skill[] = []

  public async create({ name, mode }: ICreateSkillDTO): Promise<Skill> {
    const skill = new Skill()

    const today = new Date()

    Object.assign(skill, {
      id: uuid(),
      name,
      mode,
      created_at: today,
      updated_at: today,
    })

    this.skills.push(skill)

    return skill
  }
}
