import { serve, setup } from 'swagger-ui-express'
import { Express, Request, Response, NextFunction } from 'express'
import docs from '@/main/docs/index'

const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.type('html')
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  next()
}

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(docs))
}
