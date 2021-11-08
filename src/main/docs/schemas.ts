import {
  addProjectParamsSchema,
  projectSchema,
  errorSchema,
  addTaskParamsSchema,
  taskSchema
} from './schemas/'

export default {
  addProjectParams: addProjectParamsSchema,
  project: projectSchema,
  addTaskParams: addTaskParamsSchema,
  task: taskSchema,

  error: errorSchema
}
