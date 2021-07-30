import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import CreateMenteeService from './CreateMenteeService'

// import AppError from '@shared/errors/AppError'

let fakeMenteesRepository: FakeMenteesRepository
let createMenteeService: CreateMenteeService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    createMenteeService = new CreateMenteeService(fakeMenteesRepository)
  })

  it('should be able to create a new mentee', async () => {
    const mentee = await createMenteeService.execute({
      name: 'John Doe',
      description: 'A nice guy',
      github_link: 'http://github.com/aNiceGuyDev',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
    })

    expect(mentee).toHaveProperty('id')
    expect(mentee.github_link).toBe('http://github.com/aNiceGuyDev')
    expect(mentee.linkedin_link).toBe('http://linkedin.com/aNiceGuyDev')
  })
})
