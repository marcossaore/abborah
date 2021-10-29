import { ValidationFactory } from '@/validation/validation-factory'
import { ValidationModel } from '@/validation/validators/models/validation-model-protocol'
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
  test('should call Odin Validation with correct value', () => {
    const sut = makeSut()
    const odinSpy = jest.spyOn(Odin, 'build')
    sut.make()
    expect(odinSpy).toHaveBeenCalledWith(sut.modelToTest)
  })
})
