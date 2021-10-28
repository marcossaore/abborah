import { AddProjectRepository } from '@/data/protocols/project/db-add-project-repository'
import { ProjectModel } from '@/domain/models/project/project'
import { AddProjectParams } from '@/domain/usecases/project/add-project'

export const mockProject = (): AddProjectParams => ({
  name: 'Project name',
  description: 'Project description',
  startDate: new Date(),
  endDate: new Date()
})

export const mockProjectModel = (): ProjectModel => ({
  id: 1,
  name: 'Project name',
  description: 'Project description',
  startDate: new Date(),
  endDate: new Date()
})

export class AddProjectRepositorySpy implements AddProjectRepository {
  projectParams: AddProjectParams
  async add (project: AddProjectRepository.Params): Promise<AddProjectRepository.Result> {
    this.projectParams = project
    return Promise.resolve(mockProjectModel())
  }
}
