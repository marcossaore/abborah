import { Controller, HttpResponse, Validation, ValidationRule } from './add-task-protocols'
import { badRequest, notFound, serverError } from '@/presentation/http-helpers/http-helper'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'
import { ProjectNotFound } from '@/presentation/errors'
import { AddTask } from '@/domain/usecases/tasks/add-task'
import { LoadTasksByIdProject } from '@/domain/usecases/tasks/load-task-by-project-id'

export class AddTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly validationRule: ValidationRule,
    private readonly loadProjectById: LoadProjectById,
    private readonly addTask: AddTask,
    private readonly loadTasksByIdProject: LoadTasksByIdProject
  ) {}

  async handle (request: AddTaskController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request) || this.validationRule.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { projectId, tasks } = request

      const project = await this.loadProjectById.load(Number(projectId))

      if (!project) {
        return notFound(new ProjectNotFound(Number(projectId)))
      }

      for (const { name, description, startDate, endDate, finished } of tasks) {
        await this.addTask.add({
          name,
          description,
          projectId: Number(projectId),
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: new Date(endDate),
          finished
        })
      }

      await this.loadTasksByIdProject.load(Number(projectId))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTaskController {
  type Task = {
    name: string
    description?: string
    startDate: Date
    endDate: Date
    finished?: boolean
  }

  export type Request = {
    projectId: string
    tasks: Task[]
  }
}
