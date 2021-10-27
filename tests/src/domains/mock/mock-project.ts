import { ProjectModel } from '@/domain/models/project/project'
import faker from 'faker'

export const mockProjectModel = (): ProjectModel => {
  return {
    id: 1,
    name: faker.random.word(),
    description: faker.random.words(5),
    startDate: faker.date.past(),
    endDate: faker.date.future()
  }
}
