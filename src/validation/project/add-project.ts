import { ValidationModel } from '../validation-model-protocol'

export const AddProjectValidationModel: ValidationModel = {
  name: {
    required: true,
    type: 'string',
    minLength: 3
  },
  description: {
    required: false,
    type: 'string',
    minLength: 3,
    maxLength: 255
  },
  startDate: {
    required: false,
    type: 'date'
  },
  endDate: {
    required: true,
    type: 'date'
  },
  finished: {
    required: false,
    type: 'boolean'
  }
}
