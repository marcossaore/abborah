import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { badRequest, serverError, ok } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy, AddProjectSpy, AddTaskFromProjectSpy } from '../../mock'
import faker from 'faker'

const mockRequest = (): any => ({
  name: faker.random.word(),
  startDate: faker.date.past(),
  description: faker.random.word(),
  endDate: faker.date.future()
})

const mockRequestWithTasks = (): any => ({
  name: faker.random.word(),
  startDate: faker.date.past(),
  description: faker.random.word(),
  endDate: faker.date.future(),
  tasks: [
    {
      name: faker.random.word(),
      description: faker.random.word(),
      startDate: faker.date.past(),
      endDate: faker.date.future()
    },
    {
      name: faker.random.word(),
      description: faker.random.word(),
      startDate: faker.date.past(),
      endDate: faker.date.future()
    }
  ]
})

type SutTypes = {
  sut: AddProjectController
  validationSpy: ValidationSpy
  addProjectSpy: AddProjectSpy
  addTaskFromProjectSpy: AddTaskFromProjectSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProjectSpy = new AddProjectSpy()
  const addTaskFromProjectSpy = new AddTaskFromProjectSpy()
  const sut = new AddProjectController(validationSpy, addProjectSpy, addTaskFromProjectSpy)
  return {
    sut,
    validationSpy,
    addProjectSpy,
    addTaskFromProjectSpy
  }
}

describe('AddProject Controller', () => {
  test('should call Validation with correct params', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return a bad request if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should return a server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call AddTask with correct values', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { name, description, startDate, endDate } = request
    expect(addProjectSpy.project).toEqual({ name, description, startDate, endDate })
  })

  test('should return a server error if AddProjectController throws', async () => {
    const { sut, addProjectSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(addProjectSpy, 'add').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return status 200 with task created on success', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(addProjectSpy.projectModel))
  })

  test('should call AddTaskFromProject if tasks are provided', async () => {
    const { sut, addTaskFromProjectSpy } = makeSut()
    const request = mockRequestWithTasks()
    await sut.handle(request)
    const taskOneMocked = addTaskFromProjectSpy.tasks[0]
    const taskTwoMocked = addTaskFromProjectSpy.tasks[1]
    const taskOneInRequest = request.tasks[0]
    const taskTwoInRequest = request.tasks[1]

    expect(taskOneMocked.description).toEqual(taskOneInRequest.description)
    expect(taskOneMocked.endDate).toEqual(taskOneInRequest.endDate)
    expect(taskOneMocked.name).toEqual(taskOneInRequest.name)
    expect(taskOneMocked.startDate).toEqual(taskOneInRequest.startDate)
    expect(taskOneMocked.projectId).toBeTruthy()
    expect(taskOneMocked.finished).toBe(false)

    expect(taskTwoMocked.description).toEqual(taskTwoInRequest.description)
    expect(taskTwoMocked.endDate).toEqual(taskTwoInRequest.endDate)
    expect(taskTwoMocked.name).toEqual(taskTwoInRequest.name)
    expect(taskTwoMocked.startDate).toEqual(taskTwoInRequest.startDate)
    expect(taskTwoMocked.projectId).toBeTruthy()
    expect(taskTwoMocked.finished).toBe(false)
  })
})
