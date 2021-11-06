import { LoadProjectByIdRepository } from './db-load-project-by-id-protocols'
import { ProjectModel } from '@/domain/models/project/project'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'

export class DbLoadProjectById implements LoadProjectById {
  constructor (
    private readonly loadProjectByIdRepository: LoadProjectByIdRepository
  ) {}

  public async load (id: number): Promise<ProjectModel> {
    const project = await this.loadProjectByIdRepository.load(id)
    return project
  }
}
