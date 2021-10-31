export const projectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    startDate: {
      type: 'string'
    },
    endDate: {
      type: 'string'
    },
    finished: {
      type: 'boolean'
    }
  },
  required: ['name', 'description', 'startDate', 'endDate', 'finished']
}
