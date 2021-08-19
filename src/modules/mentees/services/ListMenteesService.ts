import { inject, injectable } from 'tsyringe'

import Mentee from '../infra/typeorm/entities/Mentee'
import IMenteesRepository from '../repositories/IMenteesRepository'

@injectable()
export default class ShowMenteeService {
  constructor(
    @inject('MenteesRepository')
    private menteesRepository: IMenteesRepository,
  ) {}

  public async execute(): Promise<Mentee[]> {
    const mentees = await this.menteesRepository.findAll()

    return mentees
  }
}
