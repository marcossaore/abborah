
import { AddTaskRepository } from '@/data/protocols/task/add-task-repository'
import { TaskModel } from '@/domain/models/task/task'
import { AddTaskParams } from '@/domain/usecases/tasks/add-task'
import { AddTask } from './db-add-task-protocols'

export class DbAddTask implements AddTask {
  constructor (private readonly addTaskRepository: AddTaskRepository) {}
  public async add (addTaskParams: AddTaskParams): Promise<TaskModel> {
    await this.addTaskRepository.add(addTaskParams)
    return Promise.resolve(null)
  }
}
