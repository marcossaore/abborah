import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { badRequest, serverError, ok } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy, AddProjectSpy, ValidationRuleSpy, mockRequest } from '../../mock'

type SutTypes = {
  sut: AddProjectController
  validationSpy: ValidationSpy
  validationRuleSpy: ValidationRuleSpy
  addProjectSpy: AddProjectSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const validationRuleSpy = new ValidationRuleSpy()
  const addProjectSpy = new AddProjectSpy()
  const sut = new AddProjectController(validationSpy, validationRuleSpy, addProjectSpy)
  return {
    sut,
    validationSpy,
    validationRuleSpy,
    addProjectSpy
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

  test('should call ValidationRule with correct values', async () => {
    const { sut, validationRuleSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationRuleSpy.input).toEqual(request)
  })

  test('should return a bad request if ValidationRule fails', async () => {
    const { sut, validationRuleSpy } = makeSut()
    jest.spyOn(validationRuleSpy, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should return a server error if ValidationRule throws', async () => {
    const { sut, validationRuleSpy } = makeSut()
    const error = new Error()
    error.stack = 'any_error'
    jest.spyOn(validationRuleSpy, 'validate').mockImplementationOnce(() => {
      throw error
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call AddProject with correct values', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { name, description, startDate, endDate } = request
    expect(addProjectSpy.project).toEqual({ name, description, startDate: new Date(startDate), endDate: new Date(endDate) })
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
})
