import { TaskModel } from '@/domain/models/task/task'
import { AddTask, AddTaskParams } from '@/domain/usecases/project/add-task'
import { mockTaskModel } from '../../domains/mock'
export class AddTaskFromProjectSpy implements AddTask {
  tasks: AddTaskParams[] = new Array<AddTaskParams>()
  tasksModel: TaskModel[] = new Array<TaskModel>()
  async add (task: AddTaskParams): Promise<void> {
    this.tasks.push(task)
    const taskModel = mockTaskModel()
    this.tasksModel.push(taskModel)
  }
}
