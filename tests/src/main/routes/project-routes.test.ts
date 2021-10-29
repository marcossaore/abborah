import app from '@/main/config/app'
import prisma from '@/infra/prisma-adapter/client'
import { mockProject } from '../../data/mock'
import request from 'supertest'

describe('Project Routes', () => {
  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  afterAll(async () => {
    await prisma.project.deleteMany()
  })

  describe('POST /projects', () => {
    test('Should return 200 on success', async () => {
      const project = mockProject()
      await request(app)
        .post('/api/projects')
        .send(project)
        .expect(200)
    })
  })
})
