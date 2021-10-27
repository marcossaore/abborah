import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddProjectController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    await this.validation.validate(request)
    return null
  }
}

export namespace AddProjectController {
  export type Request = {
    name: string
    description?: string
    startDate: string
    endDate: string
  }
}
