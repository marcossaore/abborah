import { DbAddTask } from '@/data/usecases/task/db-add-task'
import { TaskMysqlRepository } from '@/infra/task/task-mysql-repository.spec'

export const makeDbAddTask = (): DbAddTask => {
  const taskMysqlRepository = new TaskMysqlRepository()
  return new DbAddTask(taskMysqlRepository)
}
