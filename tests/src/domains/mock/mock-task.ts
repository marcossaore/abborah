import { TaskModel } from '@/domain/models/task/task'
import faker from 'faker'

export const mockTaskModel = (): TaskModel => {
  return {
    id: 1,
    projectId: 1,
    name: faker.random.word(),
    description: faker.random.words(5),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    finished: false
  }
}
