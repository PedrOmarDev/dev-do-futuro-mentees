import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Mentee from '../infra/typeorm/entities/Mentee'
import IMenteesRepository from '../repositories/IMenteesRepository'
import ICreateMenteeDTO from '../dtos/ICreateMenteeDTO'

interface IUpdateMenteeDTO extends ICreateMenteeDTO {
  mentee_id: string
}

@injectable()
export default class UpdateMenteeService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,
  ) {}

  public async execute({
    mentee_id,
    name,
    description,
    linkedin_link,
    github_link,
  }: IUpdateMenteeDTO): Promise<Mentee> {
    const mentee = await this.menteesRepository.findById(mentee_id)

    if (!mentee) throw new AppError('Mentee not found')

    mentee.name = name
    mentee.description = description
    mentee.linkedin_link = linkedin_link
    mentee.github_link = github_link

    await this.menteesRepository.update(mentee)

    return mentee
  }
}
