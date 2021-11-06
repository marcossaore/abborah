export class ProjectNotFound extends Error {
  constructor (projectId: number) {
    super(`Project with ${projectId} not found`)
    this.name = 'ProjectNotFound'
  }
}
