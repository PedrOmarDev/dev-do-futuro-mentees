import { Request, Response } from 'express'
// import { container } from 'tsyringe'

// import FetchNewsService from '@modules/news/services/FetchNewsService'

export default class MenteesController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Hello, world!' })
  }
}
