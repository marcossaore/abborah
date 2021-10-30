import { Controller, HttpResponse, Validation } from './add-project-protocols'
import { badRequest, ok, serverError } from '@/presentation/http-helpers/http-helper'
import { AddProject } from '@/domain/usecases/project/add-project'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, description, endDate, startDate } = request

      const project = await this.addProject.add({ name, description, startDate: new Date(startDate), endDate: new Date(endDate) })

      return ok(project)
    } catch (error) {
      return serverError(error)
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
