import { AddTask, Controller, HttpResponse, Validation, ValidationRule } from './add-task-protocols'
import { badRequest, notFound, ok, serverError } from '@/presentation/http-helpers/http-helper'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'
import { ProjectNotFound } from '@/presentation/errors'

export class AddTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validationRule: ValidationRule,
    private readonly loadProjectById: LoadProjectById,
    private readonly addTask: AddTask
  ) {}

  async handle (request: AddTaskController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request) || this.validationRule.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { projectId, name, description, startDate, endDate, finished } = request

      const project = await this.loadProjectById.load(Number(projectId))

      if (!project) {
        return notFound(new ProjectNotFound(Number(projectId)))
      }

      const taskModel = await this.addTask.add({
        name,
        description,
        projectId: Number(projectId),
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: new Date(endDate),
        finished
      })

      return ok(taskModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTaskController {
  export type Request = {
    projectId: string
    name: string
    description?: string
    startDate: Date
    endDate: Date
    finished?: boolean
  }
}
