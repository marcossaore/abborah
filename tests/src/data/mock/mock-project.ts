import { ProjectModel } from '@/domain/models/project/project'
import { AddProjectParams } from '@/domain/usecases/project/add-project'
import { AddProjectRepository } from '@/data/protocols/project/add-project-repository'
import { LoadProjectByIdRepository } from '@/data/protocols/project/load-project-by-id-repository'

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

export class LoadProjectByIdRepositorySpy implements LoadProjectByIdRepository {
  id: number
  projectModel: LoadProjectByIdRepository.Result
  async loadById (id: LoadProjectByIdRepository.Params): Promise<LoadProjectByIdRepository.Result> {
    this.id = id
    this.projectModel = mockProjectModel()
    return Promise.resolve(this.projectModel)
  }
}
