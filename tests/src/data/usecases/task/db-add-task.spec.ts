import { DbAddTask } from '@/data/usecases/task/db-add-task'
import { mockThrowError } from '@/tests/src/mock-utils'
import { AddTaskRepositorySpy, mockTask } from '../../mock'

type SutTypes = {
  sut: DbAddTask
  addTaskRepositorySpy: AddTaskRepositorySpy
}

const makeSut = (): SutTypes => {
  const addTaskRepositorySpy = new AddTaskRepositorySpy()
  const sut = new DbAddTask(addTaskRepositorySpy)
  return {
    sut,
    addTaskRepositorySpy
  }
}

describe('DbAddTask UseCase', () => {
  test('should call AddTaskRepository with correct values', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    const mock = mockTask()
    await sut.add(mock)
    expect(addTaskRepositorySpy.addTaskParams).toEqual(mock)
  })

  test('should throws if AddTaskRepository throws', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    jest.spyOn(addTaskRepositorySpy, 'add').mockImplementationOnce(mockThrowError)
    const mock = mockTask()
    const promise = sut.add(mock)
    await expect(promise).rejects.toThrow()
  })

  test('should return a task when succeds', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    const mock = mockTask()
    const taskModel = await sut.add(mock)
    expect(taskModel).toEqual(addTaskRepositorySpy.taskModel)
  })
})
