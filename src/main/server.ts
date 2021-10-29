import 'module-alias/register'
import env from './config/env'
import prisma from '@/infra/prisma-adapter/client'

prisma.$connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch(console.error)
