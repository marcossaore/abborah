export const addTaskParamsSchema = {
  type: 'object',
  properties: {
    projectId: {
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
  required: ['projectId', 'name', 'endDate']
}
