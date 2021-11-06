import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { AddProjectRepositorySpy, mockProject } from '../../mock'
import MockDate from 'mockdate'
import { mockThrowError } from '@/tests/src/mock-utils'

type SutTypes = {
  sut: DbAddProject
  addProjectRepository: AddProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProjectRepository = new AddProjectRepositorySpy()
  const sut = new DbAddProject(addProjectRepository)
  return {
    sut,
    addProjectRepository
  }
}

describe('DbAddProject UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call AddProjectRepository with correct values', async () => {
    const { sut, addProjectRepository } = makeSut()
    const mock = mockProject()
    await sut.add(mock)
    expect(addProjectRepository.projectParams).toEqual(mock)
  })

  test('should throws if AddProjectRepository throws', async () => {
    const { sut, addProjectRepository } = makeSut()
    jest.spyOn(addProjectRepository, 'add').mockImplementationOnce(mockThrowError)
    const promise = sut.add(mockProject())
    await expect(promise).rejects.toThrow()
  })

  test('should throws if AddProjectRepository throws', async () => {
    const { sut, addProjectRepository } = makeSut()
    jest.spyOn(addProjectRepository, 'add').mockImplementationOnce(mockThrowError)
    const promise = sut.add(mockProject())
    await expect(promise).rejects.toThrow()
  })

  test('should returns a Project on success', async () => {
    const { sut } = makeSut()
    const mock = mockProject()
    const projectModel = await sut.add(mock)
    expect(projectModel.id).toBeTruthy()
    expect(projectModel.name).toBe(mock.name)
    expect(projectModel.description).toBe(mock.description)
    expect(projectModel.startDate).toEqual(mock.startDate)
    expect(projectModel.endDate).toEqual(mock.endDate)
  })
})
