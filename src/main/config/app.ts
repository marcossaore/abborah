import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import setupSwagger from '@/main/config/config-swagger'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupSwagger(app)
setupRoutes(app)
export default app
