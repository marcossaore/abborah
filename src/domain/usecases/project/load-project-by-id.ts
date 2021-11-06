import { ProjectModel } from '@/domain/models/project/project'

export interface LoadProjectById {
  load: (id: number) => Promise<ProjectModel>
}
