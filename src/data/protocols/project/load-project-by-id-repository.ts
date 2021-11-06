import { ProjectModel } from '@/domain/models/project/project'

export interface LoadProjectByIdRepository {
  load: (id: number) => Promise<ProjectModel>
}

export namespace LoadProjectByIdRepository {
  export type Params = number
  export type Result = ProjectModel
}
