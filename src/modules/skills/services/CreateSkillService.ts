import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Skill from '../infra/typeorm/entities/Skill'
import ISkillsRepository from '../repositories/ISkillsRepository'
import ICreateSkillDTO from '../dtos/ICreateSkillDTO'

@injectable()
export default class CreateSkillService {
  constructor(
    @inject('SkillsRepository')
    private skillsRepository: ISkillsRepository,
  ) {}

  public async execute({ name, mode }: ICreateSkillDTO): Promise<Skill> {
    const checkName = await this.skillsRepository.findByName(name)

    if (!!checkName) throw new AppError('Name already in use')

    const skill = await this.skillsRepository.create({
      name,
      mode,
    })

    return skill
  }
}
