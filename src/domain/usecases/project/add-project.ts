import { ProjectModel } from '@/domain/models/project/project'

export type AddProjectParams = Omit<ProjectModel, 'id'>

export interface AddProject {
  add: (project: AddProjectParams) => Promise<ProjectModel>
}
