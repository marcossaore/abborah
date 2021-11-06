import { AddTaskController } from '@/presentation/controllers/task/add-task-controller'
import { badRequest, serverError } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy, ValidationRuleSpy, mockTaskRequest, LoadProjectByIdSpy } from '../../mock'

type SutTypes = {
  sut: AddTaskController
  validationSpy: ValidationSpy
  validationRuleSpy: ValidationRuleSpy
  loadProjectByIdSpy: LoadProjectByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const validationRuleSpy = new ValidationRuleSpy()
  const loadProjectByIdSpy = new LoadProjectByIdSpy()
  const sut = new AddTaskController(validationSpy, validationRuleSpy, loadProjectByIdSpy)
  return {
    sut,
    validationSpy,
    validationRuleSpy,
    loadProjectByIdSpy
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
    expect(loadProjectByIdSpy.id).toEqual(request.idProject)
  })
})
