import ICreateMenteeDTO from '../dtos/ICreateMenteeDTO'
import Mentee from '../infra/typeorm/entities/Mentee'

export default interface IMenteesRepository {
  create(data: ICreateMenteeDTO): Promise<Mentee>
}
