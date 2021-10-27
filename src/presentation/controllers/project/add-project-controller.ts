import { badRequest } from '@/presentation/http-helpers/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddProjectController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
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
