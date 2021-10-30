import { Controller, HttpResponse, Validation, AddProject, ValidationRule } from './add-project-protocols'
import { badRequest, ok, serverError } from '@/presentation/http-helpers/http-helper'
export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validationRule: ValidationRule,
    private readonly addProject: AddProject
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request) || this.validationRule.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, description, startDate, endDate } = request

      const project = await this.addProject.add({ name, description, startDate: startDate ? new Date(startDate) : new Date(), endDate: new Date(endDate) })

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
