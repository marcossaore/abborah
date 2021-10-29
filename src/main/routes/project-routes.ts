import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddProjectController } from '@/main/factories/controllers/project/add-project-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/projects', adaptRoute(makeAddProjectController()))
}
