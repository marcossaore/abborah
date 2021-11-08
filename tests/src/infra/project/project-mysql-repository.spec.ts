import { ProjectMysqlRepository } from '@/infra/project/project-mysql-repository'
import prisma from '@/infra/prisma-adapter/client'
import { mockProject } from '../../data/mock'

const makeSut = (): ProjectMysqlRepository => {
  return new ProjectMysqlRepository()
}

describe('ProjectMysqlRepository', () => {
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
    test('should save a new project in db', async () => {
      const sut = makeSut()
      const mock = mockProject()
      const project = await sut.add(mock)
      expect(project.id).toBeTruthy()
      expect(project.name).toBe(mock.name)
      expect(project.description).toBe(mock.description)
      expect(project.startDate).toEqual(mock.startDate)
      expect(project.endDate).toEqual(mock.endDate)
    })
  })

  describe('#loadById()', () => {
    test('should load a project', async () => {
      const projectSaved = await prisma.project.create({
        data: mockProject()
      })
      const sut = makeSut()
      const projectLoaded = await sut.loadById(projectSaved.id)
      expect(projectLoaded.id).toBe(projectSaved.id)
      expect(projectLoaded.name).toBe(projectSaved.name)
      expect(projectLoaded.description).toBe(projectSaved.description)
      expect(projectLoaded.startDate).toEqual(projectSaved.startDate)
      expect(projectLoaded.endDate).toEqual(projectSaved.endDate)
    })
  })
})
