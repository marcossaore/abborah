import { ProjectModel } from '@/domain/models/project/project'

export interface LoadProjectByIdRepository {
  loadById: (id: number) => Promise<ProjectModel>
}

export namespace LoadProjectByIdRepository {
  export type Params = number
  export type Result = ProjectModel
}
