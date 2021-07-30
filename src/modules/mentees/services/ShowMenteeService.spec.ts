import AppError from '@shared/errors/AppError'

import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import ShowMenteeService from './ShowMenteeService'

let fakeMenteesRepository: FakeMenteesRepository
let showMenteeService: ShowMenteeService

describe('ShowMentee', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    showMenteeService = new ShowMenteeService(fakeMenteesRepository)
  })

  it('should be able to show a mentee', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const updated_mentee = await showMenteeService.execute({
      mentee_id: mentee.id,
    })

    expect(updated_mentee).toHaveProperty('id')
    expect(updated_mentee.name).toBe('John Doe')
    expect(updated_mentee.github_link).toBe('http://github.com/aNiceGuyDev')
    expect(updated_mentee.linkedin_link).toBe('http://linkedin.com/aNiceGuyDev')
  })

  it('should not be able to show a non-existing mentee', async () => {
    await expect(
      showMenteeService.execute({
        mentee_id: 'non-existing-mentee-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
