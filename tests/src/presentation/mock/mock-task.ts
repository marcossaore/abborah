import { AddTask, AddTaskParams } from '@/domain/usecases/tasks/add-task'
import faker from 'faker'
import { ProjectModel } from '@/domain/models/project/project'
import { mockProjectModel } from '../../data/mock'
import { LoadProjectById } from '@/domain/usecases/project/load-project-by-id'
import { TaskModel } from '@/domain/models/task/task'
import { mockTaskModel } from '../../domains/mock'

export const mockTaskRequest = (): any => {
  return {
    projectId: 1,
    name: faker.random.word(),
    startDate: faker.date.past().toString(),
    description: faker.random.word(),
    endDate: faker.date.future().toString(),
    finished: false
  }
}

export class LoadProjectByIdSpy implements LoadProjectById {
  id: number
  projectModel: ProjectModel
  async load (id: number): Promise<ProjectModel> {
    this.id = id
    this.projectModel = mockProjectModel()
    return Promise.resolve(this.projectModel)
  }
}

export class AddTaskFromProjectSpy implements AddTask {
  task: AddTaskParams
  taskModel: TaskModel
  async add (task: AddTaskParams): Promise<TaskModel> {
    this.task = task
    this.taskModel = mockTaskModel()
    return Promise.resolve(this.taskModel)
  }
}
