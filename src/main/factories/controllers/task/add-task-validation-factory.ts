import { AddTaskValidationModel } from '@/validation/task/add-task'
import { ValidationFactory } from '@/validation/validation-factory'
export class AddTaskValidationFactory extends ValidationFactory {
  constructor () {
    super(AddTaskValidationModel)
  }
}
