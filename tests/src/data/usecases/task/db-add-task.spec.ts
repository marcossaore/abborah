import { DbAddTask } from '@/data/usecases/task/db-add-task'
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
  test('should call AddTaskRepositorySpy with correct values', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    const mock = mockTask()
    await sut.add(mock)
    expect(addTaskRepositorySpy.addTaskParams).toEqual(mock)
  })
})
