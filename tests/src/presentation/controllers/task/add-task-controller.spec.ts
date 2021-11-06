import { AddTaskController } from '@/presentation/controllers/task/add-task-controller'
import { MissingParamError, ProjectNotFound } from '@/presentation/errors'
import { badRequest, serverError, notFound } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy, ValidationRuleSpy, mockTaskRequest, LoadProjectByIdSpy, AddTaskFromProjectSpy, LoadTasksByIdProjectSpy } from '../../mock'

type SutTypes = {
  sut: AddTaskController
  validationSpy: ValidationSpy
  validationRuleSpy: ValidationRuleSpy
  loadProjectByIdSpy: LoadProjectByIdSpy
  addTaskFromProjectSpy: AddTaskFromProjectSpy
  loadTasksByIdProjectSpy: LoadTasksByIdProjectSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const validationRuleSpy = new ValidationRuleSpy()
  const loadProjectByIdSpy = new LoadProjectByIdSpy()
  const addTaskFromProjectSpy = new AddTaskFromProjectSpy()
  const loadTasksByIdProjectSpy = new LoadTasksByIdProjectSpy()
  const sut = new AddTaskController(validationSpy, validationRuleSpy, loadProjectByIdSpy, addTaskFromProjectSpy, loadTasksByIdProjectSpy)
  return {
    sut,
    validationSpy,
    validationRuleSpy,
    loadProjectByIdSpy,
    addTaskFromProjectSpy,
    loadTasksByIdProjectSpy
  }
}

describe('AddTaskController Controller', () => {
  test('should call Validation with correct params', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockTaskRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return a bad request if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should return a server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call ValidationRule with correct values', async () => {
    const { sut, validationRuleSpy } = makeSut()
    const request = mockTaskRequest()
    await sut.handle(request)
    expect(validationRuleSpy.input).toEqual(request)
  })

  test('should return a bad request if ValidationRule fails', async () => {
    const { sut, validationRuleSpy } = makeSut()
    jest.spyOn(validationRuleSpy, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should return a server error if ValidationRule throws', async () => {
    const { sut, validationRuleSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(validationRuleSpy, 'validate').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call LoadProjectById with correct id', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    const request = mockTaskRequest()
    await sut.handle(request)
    expect(loadProjectByIdSpy.id).toEqual(request.projectId)
  })

  test('should return a notFound if LoadProjectById returns null', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    jest.spyOn(loadProjectByIdSpy, 'load').mockReturnValueOnce(Promise.resolve(null))
    const request = mockTaskRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound(new ProjectNotFound(Number(request.projectId))))
  })

  test('should return a server error if LoadProjectById throws', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(loadProjectByIdSpy, 'load').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call AddTaskFromProjectSpy with correct values', async () => {
    const { sut, addTaskFromProjectSpy } = makeSut()
    const request = mockTaskRequest()
    await sut.handle(request)
    const tasks = request.tasks
    tasks.forEach(task => {
      task.projectId = request.projectId
      task.startDate = new Date(task.startDate || new Date())
      task.endDate = new Date(task.endDate || new Date())
    })
    expect(addTaskFromProjectSpy.tasks).toEqual(tasks)
  })

  test('should return a server error if AddTaskFromProjectSpy throws', async () => {
    const { sut, addTaskFromProjectSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(addTaskFromProjectSpy, 'add').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return a bad request if name in task is not provided', async () => {
    const { sut } = makeSut()
    const request = mockTaskRequest()
    request.tasks[0].name = undefined
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('tasks[0].name')))
  })

  test('should call LoadTasksByProjectId', async () => {
    const { sut, loadTasksByIdProjectSpy } = makeSut()
    const request = mockTaskRequest()
    await sut.handle(request)
    expect(loadTasksByIdProjectSpy.projectId).toEqual(request.projectId)
  })

  test('should return a server error if LoadTasksByProjectId throws', async () => {
    const { sut, loadProjectByIdSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(loadProjectByIdSpy, 'load').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockTaskRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should returns 200 on success', async () => {
    const { sut, loadTasksByIdProjectSpy } = makeSut()
    const request = mockTaskRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.tasks).toEqual(loadTasksByIdProjectSpy.tasksModel)
  })
})
