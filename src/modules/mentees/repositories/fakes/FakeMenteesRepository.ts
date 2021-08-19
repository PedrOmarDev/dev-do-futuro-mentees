import { v4 as uuid } from 'uuid'

import ICreateMenteeDTO from '@modules/mentees/dtos/ICreateMenteeDTO'
import Mentee from '@modules/mentees/infra/typeorm/entities/Mentee'
import IMenteesRepository from '../IMenteesRepository'

export default class FakeMenteesRepository implements IMenteesRepository {
  private mentees: Mentee[] = []

  public async findAll(): Promise<Mentee[]> {
    return this.mentees
  }

  public async findById(mentee_id: string): Promise<Mentee | undefined> {
    const mentee = this.mentees.find(mentee => mentee.id === mentee_id)

    return mentee
  }

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

  public async update(mentee: Mentee): Promise<Mentee> {
    const findIndex = this.mentees.findIndex(
      findMentee => findMentee.id === mentee.id,
    )

    this.mentees[findIndex] = mentee

    return mentee
  }

  public async remove(mentee: Mentee): Promise<boolean> {
    const findIndex = this.mentees.findIndex(
      findMentee => findMentee.id === mentee.id,
    )

    if (findIndex === -1) return false

    this.mentees.splice(findIndex, 1)

    return true
  }
}
