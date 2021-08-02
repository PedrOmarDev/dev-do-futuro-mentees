import ICreateSkillDTO from '../dtos/ICreateSkillDTO'
import Skill from '../infra/typeorm/entities/Skill'

export default interface ISkillsRepository {
  create(data: ICreateSkillDTO): Promise<Skill>
}
