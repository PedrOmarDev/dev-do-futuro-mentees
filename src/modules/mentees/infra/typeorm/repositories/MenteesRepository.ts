import { getRepository, Repository } from 'typeorm'

import Mentee from '../entities/Mentee'
import IMenteesRepository from '@modules/mentees/repositories/IMenteesRepository'

import ICreateMenteeDTO from '@modules/mentees/dtos/ICreateMenteeDTO'

export default class MenteesRepository implements IMenteesRepository {
  private ormRepository: Repository<Mentee>

  constructor() {
    this.ormRepository = getRepository(Mentee)
  }

  public async findAll(): Promise<Mentee[]> {
    const mentees = await this.ormRepository.find()

    return mentees
  }

  public async findById(mentee_id: string): Promise<Mentee | undefined> {
    const mentee = await this.ormRepository.findOne(mentee_id)

    return mentee
  }

  public async create({
    name,
    description,
    linkedin_link,
    github_link,
  }: ICreateMenteeDTO): Promise<Mentee> {
    const mentee = this.ormRepository.create({
      name,
      description,
      linkedin_link,
      github_link,
    })

    await this.ormRepository.save(mentee)

    return mentee
  }

  public async update(mentee: Mentee): Promise<Mentee> {
    return this.ormRepository.save(mentee)
  }

  public async remove(mentee: Mentee): Promise<boolean> {
    const removed_menteed = await this.ormRepository.remove(mentee)

    return !!removed_menteed
  }
}
