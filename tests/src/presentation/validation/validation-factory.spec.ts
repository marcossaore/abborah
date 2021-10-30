import { ValidationFactory } from '@/validation/validation-factory'
import { ValidationModel } from '@/validation/validation-model-protocol'
import { Odin } from 'odin-validator'

class ValidationFactoryImplSpy extends ValidationFactory {
  modelToTest: ValidationModel
  constructor () {
    const fieldValidationModel: ValidationModel = {
      field: {
        required: true,
        type: 'string'
      }
    }
    super(fieldValidationModel)
    this.modelToTest = fieldValidationModel
  }
}

const makeSut = (): ValidationFactoryImplSpy => {
  return new ValidationFactoryImplSpy()
}

describe('Validation Factory', () => {
  test('should call Odin build Validation with correct value', () => {
    const sut = makeSut()
    const odinSpy = jest.spyOn(Odin, 'build')
    sut.make()
    expect(odinSpy).toHaveBeenCalledWith(sut.modelToTest)
  })

  test('should return odin validate method', () => {
    const sut = makeSut()
    const validation = sut.make()
    expect(validation.validate).toBeInstanceOf(Function)
  })
})
