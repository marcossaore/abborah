import { Controller, HttpResponse, Validation, ValidationRule } from './add-task-protocols'
import { badRequest, serverError } from '@/presentation/http-helpers/http-helper'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'

export class AddTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validationRule: ValidationRule,
    private readonly loadProjectById: LoadProjectById
  ) {}

  async handle (request: AddTaskController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request) || this.validationRule.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { idProject } = request

      await this.loadProjectById.load(Number(idProject))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTaskController {
  export type Request = {
    idProject: string
    name: string
    description?: string
    startDate: string
    endDate: string
    finished?: boolean
  }
}
