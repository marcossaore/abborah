import { DbLoadProjectById } from '@/data/usecases/project/db-load-project-by-id'
import { LoadProjectByIdRepositorySpy } from '../../mock/mock-task'

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

describe('DbAddProject UseCase', () => {
  test('should call LoadProjectByIdRepository with correct id', async () => {
    const { sut, loadProjectByIdRepositorySpy } = makeSut()
    await sut.load(mockId)
    expect(loadProjectByIdRepositorySpy.id).toEqual(mockId)
  })
})
