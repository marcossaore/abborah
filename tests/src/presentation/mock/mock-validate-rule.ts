import { ValidationRule } from '@/domain/usecases/utils/validation-rule'

export class ValidationRuleSpy implements ValidationRule {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
