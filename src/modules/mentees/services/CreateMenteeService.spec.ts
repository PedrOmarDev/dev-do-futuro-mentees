import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import CreateMenteeService from './CreateMenteeService'

let fakeMenteesRepository: FakeMenteesRepository
let createMenteeService: CreateMenteeService

describe('CreateMentee', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    createMenteeService = new CreateMenteeService(fakeMenteesRepository)
  })

  it('should be able to create a new mentee', async () => {
    const mentee = await createMenteeService.execute({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    expect(mentee).toHaveProperty('id')
    expect(mentee.github_link).toBe('http://github.com/aNiceGuyDev')
    expect(mentee.linkedin_link).toBe('http://linkedin.com/aNiceGuyDev')
  })
})
