import { LoadProjectByIdRepository } from '@/data/protocols/project/load-project-by-id-repository'
import { mockProjectModel } from '.'

export class LoadProjectByIdRepositorySpy implements LoadProjectByIdRepository {
  id: number
  projectModel: LoadProjectByIdRepository.Result
  async load (id: LoadProjectByIdRepository.Params): Promise<LoadProjectByIdRepository.Result> {
    this.id = id
    this.projectModel = mockProjectModel()
    return Promise.resolve(this.projectModel)
  }
}
