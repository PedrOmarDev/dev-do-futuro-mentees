import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSkillService from '@modules/skills/services/CreateSkillService'

export default class SkillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, mode } = request.body

    const createSkill = container.resolve(CreateSkillService)

    const skill = await createSkill.execute({
      name,
      mode,
    })

    return response.json(skill)
  }
}
