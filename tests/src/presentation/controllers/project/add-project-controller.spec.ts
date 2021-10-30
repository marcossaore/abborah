import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { badRequest, serverError, ok } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy, AddProjectSpy } from '../../mock'
import faker from 'faker'

const mockRequest = (): any => {
  const today = new Date()
  const cloneToday = new Date(today.getTime())
  const todayPlus5Hours = new Date(cloneToday.setHours(cloneToday.getHours() + 5))
  return {
    name: faker.random.word(),
    startDate: today,
    description: faker.random.word(),
    endDate: todayPlus5Hours
  }
}

type SutTypes = {
  sut: AddProjectController
  validationSpy: ValidationSpy
  addProjectSpy: AddProjectSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProjectSpy = new AddProjectSpy()
  const sut = new AddProjectController(validationSpy, addProjectSpy)
  return {
    sut,
    validationSpy,
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
})
