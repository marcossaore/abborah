import { AddTask, AddTaskParams } from '@/domain/usecases/project/add-task'
import faker from 'faker'
import { ProjectModel } from '@/domain/models/project/project'
import { mockProjectModel } from '../../data/mock'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'

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
