import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { ProjectMysqlRepository } from '@/infra/project/project-mysql-repository'
import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { AddProjectValidationFactory } from './add-project-validation-factory'

export const makeAddProjectController = (): AddProjectController => {
  const addProjectValidationFactory = new AddProjectValidationFactory()
  const projectMysqlRepository = new ProjectMysqlRepository()
  const dbAddProject = new DbAddProject(projectMysqlRepository)
  const addProjectController = new AddProjectController(addProjectValidationFactory.make(), dbAddProject)
  return addProjectController
}
