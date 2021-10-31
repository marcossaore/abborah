import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/index'

export default (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve)
  app.get('/api-docs', swaggerUi.setup(docs))
}
