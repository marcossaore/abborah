import { AddProjectValidationModel } from '@/validation/project/add-project'
import { ValidationFactory } from '@/validation/validation-factory'
export class AddProjectValidationFactory extends ValidationFactory {
  constructor () {
    super(AddProjectValidationModel)
  }
}
