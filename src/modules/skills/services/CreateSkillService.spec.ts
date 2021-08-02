import { TypeSkill } from '../enums/TypeSkillEnum'
import FakeSkillsRepository from '../repositories/fakes/FakeSkillsRepository'
import CreateSkillService from './CreateSkillService'

let fakeSkillsRepository: FakeSkillsRepository
let createSkill: CreateSkillService

describe('ListMentees', () => {
  beforeEach(() => {
    fakeSkillsRepository = new FakeSkillsRepository()
    createSkill = new CreateSkillService(fakeSkillsRepository)
  })

  it('should be able to create a skill', async () => {
    const hard_skill = await createSkill.execute({
      name: 'Node.js',
      mode: TypeSkill.hard,
    })

    expect(hard_skill).toHaveProperty('id')
    expect(hard_skill.name).toBe('Node.js')
    expect(hard_skill.mode).toBe(TypeSkill.hard)
  })
})
