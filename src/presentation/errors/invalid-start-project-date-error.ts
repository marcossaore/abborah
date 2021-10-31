export class InvalidStartProjectDateError extends Error {
  constructor () {
    super('start project date cannot be greather than 30 days before')
    this.name = 'InvalidStartProjectDateError'
  }
}
