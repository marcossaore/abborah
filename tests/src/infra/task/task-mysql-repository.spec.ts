import { TaskMysqlRepository } from '@/infra/task/task-mysql-repository.spec'
import prisma from '@/infra/prisma-adapter/client'
import { mockProject } from '../../data/mock'
import { AddTaskParams } from '@/domain/usecases/tasks/add-task'

const makeSut = (): TaskMysqlRepository => {
  return new TaskMysqlRepository()
}

describe('TaskMysqlRepository', () => {
  afterAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  beforeAll(async () => {
    await prisma.$disconnect()
  })

  describe('#add()', () => {
    test('should save a new task in db', async () => {
      const project = await prisma.project.create({
        data: mockProject()
      })

      const taskToSave: AddTaskParams = {
        projectId: project.id,
        name: 'task name',
        description: 'task description',
        startDate: new Date(),
        endDate: new Date(),
        finished: false
      }

      const sut = makeSut()
      const newTask = await sut.add(taskToSave)
      expect(newTask.id).toBeTruthy()
      expect(newTask.name).toBe(taskToSave.name)
      expect(newTask.description).toBe(taskToSave.description)
      expect(newTask.startDate).toEqual(taskToSave.startDate)
      expect(newTask.endDate).toEqual(taskToSave.endDate)
      expect(newTask.finished).toEqual(taskToSave.finished)
    })
  })
})
