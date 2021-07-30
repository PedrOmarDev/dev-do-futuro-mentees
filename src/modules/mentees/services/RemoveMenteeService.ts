import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IMenteesRepository from '../repositories/IMenteesRepository'

interface IShowMenteeDTO {
  mentee_id: string
}

@injectable()
export default class RemoveMenteeService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,
  ) {}

  public async execute({ mentee_id }: IShowMenteeDTO): Promise<boolean> {
    const mentee = await this.menteesRepository.findById(mentee_id)

    if (!mentee) throw new AppError('Mentee not found')

    await this.menteesRepository.remove(mentee)

    return true
  }
}
