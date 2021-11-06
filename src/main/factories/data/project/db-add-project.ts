import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { ProjectMysqlRepository } from '@/infra/project/project-mysql-repository'

export const makeDbAddProject = (): DbAddProject => {
  const projectMysqlRepository = new ProjectMysqlRepository()
  return new DbAddProject(projectMysqlRepository)
}
