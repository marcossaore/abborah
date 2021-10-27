import { TaskModel } from '@/domain/models/task/task'

export type AddTaskParams = Omit<TaskModel, 'id'>

export interface AddTask {
  add: (task: AddTaskParams) => Promise<TaskModel>
}
