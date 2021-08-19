import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Mentee from '../infra/typeorm/entities/Mentee'
import IMenteesRepository from '../repositories/IMenteesRepository'

interface IShowMenteeDTO {
  mentee_id: string
}

@injectable()
export default class ShowMenteeService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,
  ) {}

  public async execute({ mentee_id }: IShowMenteeDTO): Promise<Mentee> {
    const mentee = await this.menteesRepository.findById(mentee_id)

    if (!mentee) throw new AppError('Mentee not found')

    return mentee
  }
}
