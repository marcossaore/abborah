import { TaskModel } from '@/domain/models/task/task'

export interface LoadTasksByIdProject {
  load: (projectId: number) => Promise<TaskModel[]>
}
