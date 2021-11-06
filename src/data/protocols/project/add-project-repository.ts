import { ProjectModel } from '@/domain/models/project/project'

type AddProjectParams = Omit<ProjectModel, 'id'>

export interface AddProjectRepository {
  add: (project: AddProjectParams) => Promise<ProjectModel>
}

export namespace AddProjectRepository {
  export type Params = AddProjectParams
  export type Result = ProjectModel
}
