import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Mentee from '../infra/typeorm/entities/Mentee'
import IMenteesRepository from '../repositories/IMenteesRepository'
import ICreateMenteeDTO from '../dtos/ICreateMenteeDTO'

@injectable()
export default class CreateMenteeService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,
  ) {}

  public async execute({
    name,
    description,
    linkedin_link,
    github_link,
  }: ICreateMenteeDTO): Promise<Mentee> {
    const mentee = await this.menteesRepository.create({
      name,
      description,
      linkedin_link,
      github_link,
    })

    return mentee
  }
}
