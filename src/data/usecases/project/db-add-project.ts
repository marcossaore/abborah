import { AddProject, AddProjectParams, ProjectModel, AddProjectRepository } from './db-add-project-protocols'

export class DbAddProject implements AddProject {
  constructor (private readonly addProjectRepository: AddProjectRepository) {}
  public async add (projectParams: AddProjectParams): Promise<ProjectModel> {
    const project = await this.addProjectRepository.add(projectParams)
    return project
  }
}
