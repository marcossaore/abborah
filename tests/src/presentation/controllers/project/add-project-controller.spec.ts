import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { badRequest } from '@/presentation/http-helpers/http-helper'
import { ValidationSpy } from '../../mock'
import faker from 'faker'

const mockRequest = (): any => ({
  name: faker.random.word(),
  startDate: faker.date.past(),
  description: faker.random.word(),
  endDate: faker.date.future()
})

type SutTypes = {
  sut: AddProjectController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddProjectController(validationSpy)
  return {
    sut,
    validationSpy
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
})
