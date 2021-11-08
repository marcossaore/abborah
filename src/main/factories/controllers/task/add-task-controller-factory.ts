import { TaskDateValidationRule } from '@/infra/validators/task-date-validation-rule'
import { AddTaskController } from '@/presentation/controllers/task/add-task-controller'
import { makeDbLoadProjectById } from '../../data/project/db-load-project-by-id'
import { makeDbAddTask } from '../../data/task/db-add-task'
import { AddTaskValidationFactory } from './add-task-validation-factory'

export const makeAddTaskController = (): AddTaskController => {
  const addTaskValidationFactory = new AddTaskValidationFactory()
  const taskDateValidationRule = new TaskDateValidationRule()

  const addTaskController = new AddTaskController(
    addTaskValidationFactory.make(),

    taskDateValidationRule,
    makeDbLoadProjectById(),
    makeDbAddTask())
  return addTaskController
}
