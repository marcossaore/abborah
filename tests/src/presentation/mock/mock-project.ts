import { ProjectModel } from '@/domain/models/project/project'
import { AddProject, AddProjectParams } from '@/domain/usecases/project/add-project'
import { mockProjectModel } from '../../domains/mock'
import faker from 'faker'

export const mockRequest = (): any => {
  const today = new Date()
  const cloneToday = new Date(today.getTime())
  const todayPlus5Hours = new Date(cloneToday.setHours(cloneToday.getHours() + 5))
  return {
    name: faker.random.word(),
    startDate: today.toString(),
    description: faker.random.word(),
    endDate: todayPlus5Hours.toString()
  }
}

export class AddProjectSpy implements AddProject {
  project: AddProjectParams
  projectModel: ProjectModel
  async add (project: AddProjectParams): Promise<ProjectModel> {
    this.project = project
    this.projectModel = mockProjectModel()
    return Promise.resolve(this.projectModel)
  }
}
