import { AddTask, AddTaskParams } from '@/domain/usecases/tasks/add-task'
import faker from 'faker'
import { ProjectModel } from '@/domain/models/project/project'
import { mockProjectModel } from '../../data/mock'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'
import { LoadTasksByIdProject } from '@/domain/usecases/tasks/load-task-by-project-id'
import { TaskModel } from '@/domain/models/task/task'
import { mockTaskModel } from '../../domains/mock'

export const mockTaskRequest = (): any => {
  const today = new Date()
  const cloneToday = new Date(today.getTime())
  const todayPlus5Hours = new Date(cloneToday.setHours(cloneToday.getHours() + 5))
  return {
    projectId: 1,
    tasks: [
      {
        name: faker.random.word(),
        startDate: today.toString(),
        description: faker.random.word(),
        endDate: todayPlus5Hours.toString(),
        finished: false
      },
      {
        name: faker.random.word(),
        startDate: today.toString(),
        description: faker.random.word(),
        endDate: todayPlus5Hours.toString(),
        finished: false
      }
    ]
  }
}

export class LoadProjectByIdSpy implements LoadProjectById {
  id: number
  projectModel: ProjectModel
  async load (id: number): Promise<ProjectModel> {
    this.id = id
    this.projectModel = mockProjectModel()
    return Promise.resolve(this.projectModel)
  }
}

export class AddTaskFromProjectSpy implements AddTask {
  tasks: AddTaskParams[] = new Array<AddTaskParams>()
  async add (task: AddTaskParams): Promise<void> {
    this.tasks.push(task)
  }
}

export class LoadTasksByIdProjectSpy implements LoadTasksByIdProject {
  projectId: number
  async load (projectId: number): Promise<TaskModel[]> {
    this.projectId = projectId
    return Promise.resolve([mockTaskModel(), mockTaskModel()])
  }
}
