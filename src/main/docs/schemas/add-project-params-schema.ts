export const addProjectParamsSchema = {
  type: 'object',
  properties: {
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
  required: ['name', 'endDate']
}
