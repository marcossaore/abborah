import { Validation } from '@/presentation/protocols/validation'
import { ValidationModel } from '@/validation/validation-model-protocol'
import { Odin } from 'odin-validator'

export abstract class ValidationFactory {
  private validation: Validation
  constructor (private readonly model: ValidationModel) {
    this.model = model
  }

  make (): Validation {
    this.validation = Object.assign({}, Odin.build(this.model))
    return this.validation
  }
}
