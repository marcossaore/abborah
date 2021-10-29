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
    required: true,
    type: 'string'
  },
  endDate: {
    required: true,
    type: 'string'
  }
}
