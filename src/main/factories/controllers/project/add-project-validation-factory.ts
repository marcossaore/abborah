import { ValidationFactory } from '../../../../validation/validation-factory'
import { AddProjectValidationModel } from '@/validation/validators/models/models'

export class AddProjectValidationFactory extends ValidationFactory {
  constructor () {
    super(AddProjectValidationModel)
  }
}
