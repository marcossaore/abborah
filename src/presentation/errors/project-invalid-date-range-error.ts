export class ProjectInvalidDateRangeError extends Error {
  constructor () {
    super('endDate must be greather than startDate')
    this.name = 'ProjectInvalidDateRangeErrors'
  }
}
