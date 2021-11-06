import { ProjectDateValidationRule } from '@/infra/validators/project-date-validation-rule'
import { AddProjectController } from '@/presentation/controllers/project/add-project-controller'
import { AddProjectValidationFactory } from './add-project-validation-factory'
import { makeDbAddProject } from '../../data/project/db-add-project'

export const makeAddProjectController = (): AddProjectController => {
  const addProjectValidationFactory = new AddProjectValidationFactory()
  const projectDateValidationRule = new ProjectDateValidationRule()
  const addProjectController = new AddProjectController(addProjectValidationFactory.make(), projectDateValidationRule, makeDbAddProject())
  return addProjectController
}
