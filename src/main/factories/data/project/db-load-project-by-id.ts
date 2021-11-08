import { DbLoadProjectById } from '@/data/usecases/project/db-load-project-by-id'
import { ProjectMysqlRepository } from '@/infra/project/project-mysql-repository'

export const makeDbLoadProjectById = (): DbLoadProjectById => {
  const projectMysqlRepository = new ProjectMysqlRepository()
  return new DbLoadProjectById(projectMysqlRepository)
}
