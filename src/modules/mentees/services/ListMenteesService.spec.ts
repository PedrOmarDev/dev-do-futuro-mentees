import FakeMenteesRepository from '../repositories/fakes/FakeMenteesRepository'
import ListMenteesService from './ListMenteesService'

let fakeMenteesRepository: FakeMenteesRepository
let listMentees: ListMenteesService

describe('ListMentees', () => {
  beforeEach(() => {
    fakeMenteesRepository = new FakeMenteesRepository()
    listMentees = new ListMenteesService(fakeMenteesRepository)
  })

  it('should be able to list all mentee', async () => {
    const mentee = await fakeMenteesRepository.create({
      name: 'John Doe',
      description: 'A nice guy',
      linkedin_link: 'http://linkedin.com/aNiceGuyDev',
      github_link: 'http://github.com/aNiceGuyDev',
    })

    const mentee2 = await fakeMenteesRepository.create({
      name: 'Joseph Doe',
      description: 'A sad guy',
      linkedin_link: 'http://linkedin.com/aSadGuyDev',
      github_link: 'http://github.com/aSadGuyDev',
    })

    const all_mentees = await listMentees.execute()

    expect(all_mentees).toHaveLength(2)
    expect(all_mentees[0].id).toBe(mentee.id)
    expect(all_mentees[1].id).toBe(mentee2.id)
  })
})
