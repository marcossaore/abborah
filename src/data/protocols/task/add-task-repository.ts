import { TaskModel } from '@/domain/models/task/task'

type AddTaskParams = Omit<TaskModel, 'id'>

export interface AddTaskRepository {
  add: (addTaksParams: AddTaskParams) => Promise<TaskModel>
}

export namespace AddProjectRepository {
  export type Params = AddTaskParams
  export type Result = TaskModel
}
