import { Controller, HttpResponse, Validation, ValidationRule } from './add-task-protocols'
import { badRequest, notFound, ok, serverError } from '@/presentation/http-helpers/http-helper'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'
import { MissingParamError, ProjectNotFound } from '@/presentation/errors'
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

      const errorHandleTasks = await this.handleTasks(projectId, tasks)

      if (errorHandleTasks) {
        return badRequest(errorHandleTasks)
      }

      const tasksModel = await this.loadTasksByIdProject.load(Number(projectId))

      return ok({ tasks: [...tasksModel] })
    } catch (error) {
      return serverError(error)
    }
  }

  private async handleTasks (projectId: string, tasks: AddTaskController.Task[]): Promise<Error> {
    for (const [index, values] of tasks.entries()) {
      const { name, description, startDate, endDate, finished } = values

      if (!name) {
        return new MissingParamError(`tasks[${index}].name`)
      }

      await this.addTask.add({
        name,
        description,
        projectId: Number(projectId),
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: new Date(endDate),
        finished
      })
    }
  }
}

export namespace AddTaskController {
  export type Task = {
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
