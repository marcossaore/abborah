import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { badRequest } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy } from '../../mock'
import faker from 'faker'
import { AddProjectSpy } from '../../mock/mock-task'

const mockRequest = (): any => ({
  name: faker.random.word(),
  startDate: faker.date.past(),
  description: faker.random.word(),
  endDate: faker.date.future()
})

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

  test('should return a bad request if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call AddTask with correct values', async () => {
    const { sut, addProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { name, description, startDate, endDate } = request
    expect(addProjectSpy.project).toEqual({ name, description, startDate, endDate })
  })
})
