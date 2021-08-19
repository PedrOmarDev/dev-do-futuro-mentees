import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListMenteesService from '@modules/mentees/services/ListMenteesService'
import ShowMenteeService from '@modules/mentees/services/ShowMenteeService'
import CreateMenteeService from '@modules/mentees/services/CreateMenteeService'
import UpdateMenteeService from '@modules/mentees/services/UpdateMenteeService'
import RemoveMenteeService from '@modules/mentees/services/RemoveMenteeService'
import UpdateMenteeSkillsService from '@modules/mentees/services/UpdateMenteeSkillsService'

export default class MenteesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMentees = container.resolve(ListMenteesService)

    const mentees = await listMentees.execute()

    return response.json(mentees)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { mentee_id } = request.params

    const showMentee = container.resolve(ShowMenteeService)

    const mentee = await showMentee.execute({
      mentee_id,
    })

    return response.json(mentee)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, linkedin_link, github_link } = request.body

    const createMentee = container.resolve(CreateMenteeService)

    const mentee = await createMentee.execute({
      name,
      description,
      linkedin_link,
      github_link,
    })

    return response.json(mentee)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { mentee_id } = request.params
    const { name, description, linkedin_link, github_link } = request.body

    const updateMentee = container.resolve(UpdateMenteeService)

    const updated_mentee = await updateMentee.execute({
      mentee_id,
      name,
      description,
      linkedin_link,
      github_link,
    })

    return response.json(updated_mentee)
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { mentee_id } = request.params

    const removeMentee = container.resolve(RemoveMenteeService)

    await removeMentee.execute({
      mentee_id,
    })

    return response.status(204).json()
  }

  public async updateSkills(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { mentee_id } = request.params
    const { skill_ids } = request.body

    const updateMenteeSkills = container.resolve(UpdateMenteeSkillsService)

    const updated_mentee = await updateMenteeSkills.execute({
      mentee_id,
      skill_ids,
    })

    return response.status(200).json(updated_mentee)
  }
}
