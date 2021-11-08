import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddTaskController } from '../factories/controllers/task/add-task-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/tasks', adaptRoute(makeAddTaskController()))
}
