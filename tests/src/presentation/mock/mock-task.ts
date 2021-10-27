import { ProjectModel } from '@/domain/models/project/project'
import { AddProject, AddProjectParams } from '@/domain/usecases/project/add-project'
import { mockProjectModel } from '../../domains/mock/mock-project'

export class AddProjectSpy implements AddProject {
  project: any
  async add (project: AddProjectParams): Promise<ProjectModel> {
    this.project = project
    return Promise.resolve(mockProjectModel())
  }
}
