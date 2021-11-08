import { AddTaskRepository } from '@/data/protocols/task/add-task-repository'
import { TaskModel } from '@/domain/models/task/task'
import { AddTaskParams } from '@/domain/usecases/tasks/add-task'

export const mockTask = (): AddTaskParams => ({
  projectId: 56,
  name: 'Project name',
  description: 'Project description',
  startDate: new Date(),
  endDate: new Date()
})

export const mockTaskModel = (): TaskModel => ({
  id: 3,
  projectId: 45,
  name: 'Project name',
  description: 'Project description',
  startDate: new Date(),
  endDate: new Date()
})

export class AddTaskRepositorySpy implements AddTaskRepository {
  addTaskParams: AddTaskParams
  taskModel: TaskModel
  async add (addTaskParams: AddTaskParams): Promise<TaskModel> {
    this.addTaskParams = addTaskParams
    this.taskModel = mockTaskModel()
    return Promise.resolve(this.taskModel)
  }
}
