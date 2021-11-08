import { TaskModel } from '@/domain/models/task/task'
import { AddTaskParams } from '@/domain/usecases/tasks/add-task'
import { AddTaskRepository } from '@/data/protocols/task/add-task-repository'
import prisma from '@/infra/prisma-adapter/client'

export class TaskMysqlRepository implements AddTaskRepository {
  async add (addTaskParams: AddTaskParams): Promise<TaskModel> {
    return await prisma.task.create({
      data: addTaskParams
    })
  }
}
