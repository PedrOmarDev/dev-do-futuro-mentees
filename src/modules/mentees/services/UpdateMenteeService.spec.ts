import AppError from '@shared/errors/AppError'

import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import UpdateMenteeService from './UpdateMenteeService'

let fakeMenteesRepository: FakeMenteesRepository
let updateMenteeService: UpdateMenteeService

describe('UpdateMentee', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    updateMenteeService = new UpdateMenteeService(fakeMenteesRepository)
  })

  it('should be able to update a mentee', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const updated_mentee = await updateMenteeService.execute({
      mentee_id: mentee.id,
      name: 'Joseph Doe',
      description: 'A sad guy',
      linkedin_link: 'http://linkedin.com/aSadGuyDev',
      github_link: 'http://github.com/aSadGuyDev',
    })

    expect(updated_mentee).toHaveProperty('id')
    expect(updated_mentee.name).toBe('Joseph Doe')
    expect(updated_mentee.github_link).toBe('http://github.com/aSadGuyDev')
    expect(updated_mentee.linkedin_link).toBe('http://linkedin.com/aSadGuyDev')
  })

  it('should not be able to update a non-existing mentee', async () => {
    await expect(
      updateMenteeService.execute({
        mentee_id: 'non-existing-mentee-id',
        name: 'Joseph Doe',
        description: 'A sad guy',
        linkedin_link: 'http://linkedin.com/aSadGuyDev',
        github_link: 'http://github.com/aSadGuyDev',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
