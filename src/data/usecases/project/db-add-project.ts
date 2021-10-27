import { AddProject, AddProjectParams, ProjectModel, AddProjectRepository } from './db-add-project-protocols'

export class DbAddProject implements AddProject {
  constructor (private readonly addProjectRepository: AddProjectRepository) {}
  public async add (projectParams: AddProjectParams): Promise<ProjectModel> {
    await this.addProjectRepository.add(projectParams)
    return Promise.resolve(null)
  }
}
