import { v4 as uuid } from 'uuid'

import ICreateMenteeDTO from '@modules/mentees/dtos/ICreateMenteeDTO'
import Mentee from '@modules/mentees/infra/typeorm/entities/Mentee'
import IMenteesRepository from '../IMenteesRepository'

export default class FakeMenteesRepository implements IMenteesRepository {
  private mentees: Mentee[] = []

  public async create({
    name,
    description,
    github_link,
    linkedin_link,
  }: ICreateMenteeDTO): Promise<Mentee> {
    const mentee = new Mentee()

    const today = new Date()

    Object.assign(mentee, {
      id: uuid(),
      name,
      description,
      github_link,
      linkedin_link,
      created_at: today,
      updated_at: today,
    })

    this.mentees.push(mentee)

    return mentee
  }
}
