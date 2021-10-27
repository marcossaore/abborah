import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, ok, serverError } from '@/presentation/http-helpers/http-helper'
import { AddProject } from '@/domain/usecases/project/add-project'
import { AddTask } from '@/domain/usecases/project/add-task'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject,
    private readonly addTask: AddTask
  ) {}

  async handle (request: AddProjectController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, description, endDate, startDate, tasks } = request

      const project = await this.addProject.add({ name, description, startDate: new Date(startDate), endDate: new Date(endDate) })

      if (tasks) {
        for (const task of tasks) {
          await this.addTask.add({
            projectId: project.id,
            name: task.name,
            description: task.description ?? null,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            finished: task.finished ?? false
          })
        }
      }

      return ok(project)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddProjectController {

  type Task = {
    name: string
    description?: string
    startDate: string
    endDate: string
    finished?: boolean
  }

  export type Request = {
    name: string
    description?: string
    startDate: string
    endDate: string
    tasks?: Task[]
  }
}
