import ICreateSkillDTO from '../dtos/ICreateSkillDTO'
import Skill from '../infra/typeorm/entities/Skill'

export default interface ISkillsRepository {
  findById(skill_id: string): Promise<Skill | undefined>
  create(data: ICreateSkillDTO): Promise<Skill>
}
