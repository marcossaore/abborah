import { ValidationRule } from '@/domain/usecases/utils/validation-rule'
import { InvalidStartProjectDateError, ProjectInvalidDateRangeError } from '@/presentation/errors'

export class ProjectDateValidationRule implements ValidationRule {
  validate (input: ProjectDateRule.Params): Error {
    const dayTime = (1000 * 3600 * 24)

    const today = new Date()

    const startDate = input.startDate ? new Date(input.startDate) : new Date(today)

    const endDate = new Date(input.endDate)

    const differenceBetweenEndDateAndStartDateInTime = endDate.getTime() - startDate.getTime()

    const differenceBetweenEndDateAndStartdateInDays = differenceBetweenEndDateAndStartDateInTime / dayTime

    if (differenceBetweenEndDateAndStartdateInDays >= 30) {
      return new InvalidStartProjectDateError()
    }

    const isEndDateGreatherThanStartDate = (endDate.getTime() - startDate.getTime()) <= 0

    if (isEndDateGreatherThanStartDate) {
      return new ProjectInvalidDateRangeError()
    }
  }
}

export namespace ProjectDateRule {
  export type Params = {
    startDate?: string
    endDate: string
  }
}
