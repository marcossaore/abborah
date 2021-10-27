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

  it('should call AddProjectRepository with correct values', async () => {
    const { sut, addProjectRepository } = makeSut()
    const mock = mockProject()
    await sut.add(mock)
    expect(addProjectRepository.projectParams).toEqual(mock)
    expect(addProjectRepository.projectResult.id).toBeTruthy()
    expect(addProjectRepository.projectResult.name).toBe(mock.name)
    expect(addProjectRepository.projectResult.description).toBe(mock.description)
    expect(addProjectRepository.projectResult.startDate).toEqual(mock.startDate)
    expect(addProjectRepository.projectResult.endDate).toEqual(mock.endDate)
  })

  it('should throws if AddProjectRepository throws', async () => {
    const { sut, addProjectRepository } = makeSut()
    jest.spyOn(addProjectRepository, 'add').mockImplementationOnce(mockThrowError)
    const promise = sut.add(mockProject())
    await expect(promise).rejects.toThrow()
  })
})
