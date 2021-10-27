import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest } from '@/presentation/http-helpers/http-helper'
import { AddProject } from '@/domain/usecases/project/add-project'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    const error = await this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }

    const { name, description, endDate, startDate } = request

    await this.addProject.add({ name, description, startDate: new Date(startDate), endDate: new Date(endDate) })
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
