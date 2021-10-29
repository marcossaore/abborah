import { Validation } from '@/presentation/protocols/validation'
import { ValidationModel } from '@/validation/validators/models/validation-model-protocol'
import { Odin } from 'odin-validator'

export abstract class ValidationFactory {
  private validation: Validation
  constructor (private readonly model: ValidationModel) {
    this.model = model
  }

  make (): Validation {
    this.validation = Odin.build(this.model)
    return this.validation
  }
}
