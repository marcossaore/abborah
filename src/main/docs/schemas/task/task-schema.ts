export const taskSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
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
  required: ['name', 'projectId', 'description', 'startDate', 'endDate', 'finished']
}
