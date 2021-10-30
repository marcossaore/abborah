export class InvalidStartProjectDateError extends Error {
  constructor () {
    super('start project date cannot be less than 30 days before')
    this.name = 'InvalidStartProjectDateError'
  }
}
