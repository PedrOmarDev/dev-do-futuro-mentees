import AppError from '@shared/errors/AppError'

import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import FakeSkillsRepository from '@modules/skills/repositories/fakes/FakeSkillsRepository'
import UpdateMenteeSkillsService from './UpdateMenteeSkillsService'
import { TypeSkill } from '@modules/skills/enums/TypeSkillEnum'

let fakeMenteesRepository: FakeMenteesRepository
let fakeSkillsRepository: FakeSkillsRepository
let updateMenteeSkillsService: UpdateMenteeSkillsService

describe('UpdateMenteeSkills', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    fakeSkillsRepository = new FakeSkillsRepository()
    updateMenteeSkillsService = new UpdateMenteeSkillsService(
      fakeMenteesRepository,
      fakeSkillsRepository,
    )
  })

  it('should be able to update a mentee', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const skill = await fakeSkillsRepository.create({
      name: 'Resilience',
      mode: TypeSkill.soft,
    })

    const updated_mentee = await updateMenteeSkillsService.execute({
      mentee_id: mentee.id,
      skill_ids: [skill.id],
    })

    expect(updated_mentee).toHaveProperty('id')
    expect(updated_mentee).toHaveProperty('skills')
    expect(updated_mentee.skills[0].id).toBe(skill.id)
  })

  it('should not be able to update a non-existing mentee', async () => {
    const skill = await fakeSkillsRepository.create({
      name: 'Resilience',
      mode: TypeSkill.soft,
    })

    await expect(
      updateMenteeSkillsService.execute({
        mentee_id: 'non-existing-mentee-id',
        skill_ids: [skill.id],
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update mentee skills providing a non-existing skill', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const skill = await fakeSkillsRepository.create({
      name: 'Resilience',
      mode: TypeSkill.soft,
    })

    await expect(
      updateMenteeSkillsService.execute({
        mentee_id: mentee.id,
        skill_ids: [skill.id, 'non-existing-skill-id'],
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
