import AppError from '@shared/errors/AppError'

import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import RemoveMenteeService from './RemoveMenteeService'

let fakeMenteesRepository: FakeMenteesRepository
let removeMenteeService: RemoveMenteeService

describe('RemoveMentee', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    removeMenteeService = new RemoveMenteeService(fakeMenteesRepository)
  })

  it('should be able to remove a mentee', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const removed_mentee = await removeMenteeService.execute({
      mentee_id: mentee.id,
    })

    expect(removed_mentee).toBe(true)
  })

  it('should not be able to remove a non-existing mentee', async () => {
    await expect(
      removeMenteeService.execute({
        mentee_id: 'non-existing-mentee-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
