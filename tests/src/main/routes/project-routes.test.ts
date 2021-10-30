import app from '@/main/config/app'
import prisma from '@/infra/prisma-adapter/client'
import request from 'supertest'
import { mockRequest } from '../../presentation/mock'

describe('Project Routes', () => {
  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  afterAll(async () => {
    await prisma.project.deleteMany()
  })

  describe('POST /projects', () => {
    test('Should return 200 on success', async () => {
      const project = mockRequest()
      await request(app)
        .post('/api/projects')
        .send(project)
        .expect(200)
    })

    test('Should return 200 and a valid date when startDate is not provided', async () => {
      const project = mockRequest()
      project.startDate = undefined
      await request(app)
        .post('/api/projects')
        .send(project)
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
