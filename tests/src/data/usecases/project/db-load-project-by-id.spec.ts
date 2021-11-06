import { DbLoadProjectById } from '@/data/usecases/project/db-load-project-by-id'
import { mockThrowError } from '@/tests/src/mock-utils'
import { LoadProjectByIdRepositorySpy } from '../../mock'

type SutTypes = {
  sut: DbLoadProjectById
  loadProjectByIdRepositorySpy: LoadProjectByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProjectByIdRepositorySpy = new LoadProjectByIdRepositorySpy()
  const sut = new DbLoadProjectById(loadProjectByIdRepositorySpy)
  return {
    sut,
    loadProjectByIdRepositorySpy
  }
}

const mockId = 3

describe('DbLoadProjectById UseCase', () => {
  test('should call LoadProjectByIdRepository with correct id', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    await sut.load(mockId)
    expect(loadProjectByIdRepositorySpy.id).toEqual(mockId)
  })

  test('should throws if LoadProjectByIdRepository throws', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    jest.spyOn(loadProjectByIdRepositorySpy, 'load').mockImplementationOnce(mockThrowError)
    const promise = sut.load(mockId)
    await expect(promise).rejects.toThrow()
  })

  test('should return a project when succeds', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    const project = await sut.load(mockId)
    expect(project).toEqual(loadProjectByIdRepositorySpy.projectModel)
  })
})
