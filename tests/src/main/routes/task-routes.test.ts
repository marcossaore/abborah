import { ProjectModel } from '@/domain/models/project/project'
import { AddTaskParams } from '@/domain/usecases/tasks/add-task'
import prisma from '@/infra/prisma-adapter/client'
import app from '@/main/config/app'
import { mockProject } from '../../data/mock'
import request from 'supertest'
import faker from 'faker'

const createProject = async (): Promise<ProjectModel> => {
  return await prisma.project.create({
    data: mockProject()
  })
}

const createMockTask = (projectId: number): AddTaskParams => {
  const today = new Date()
  const cloneToday = new Date(today.getTime())
  const todayPlus5Hours = new Date(cloneToday.setHours(cloneToday.getHours() + 5))

  return {
    projectId,
    name: faker.random.word(),
    description: faker.random.words(),
    startDate: today,
    endDate: todayPlus5Hours
  }
}

describe('Task Routes', () => {
  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  afterAll(async () => {
    await prisma.project.deleteMany()
  })

  describe('POST /task', () => {
    test('Should return 200 on success', async () => {
      const project = await createProject()
      const task = createMockTask(project.id)
      await request(app)
        .post('/api/projects')
        .send(task)
        .expect(200)
    })

    test('Should return 200 and a valid date when startDate is not provided', async () => {
      const project = await createProject()
      const task = createMockTask(project.id)
      task.startDate = undefined
      await request(app)
        .post('/api/tasks')
        .send(task)
        .expect(200)
        .then(response => {
          const today = new Date()
          const createdDate = new Date(response.body.startDate)
          expect(createdDate.getDate()).toBe(today.getDate())
          expect(createdDate.getMonth()).toBe(today.getMonth())
          expect(createdDate.getFullYear()).toBe(today.getFullYear())
        })
    })
  })
})
