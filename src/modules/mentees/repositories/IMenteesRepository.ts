import ICreateMenteeDTO from '../dtos/ICreateMenteeDTO'
import Mentee from '../infra/typeorm/entities/Mentee'

export default interface IMenteesRepository {
  findAll(): Promise<Mentee[]>
  findById(mentee_id: string): Promise<Mentee | undefined>
  create(data: ICreateMenteeDTO): Promise<Mentee>
  update(mentee: Mentee): Promise<Mentee>
  remove(mentee: Mentee): Promise<boolean>
}
