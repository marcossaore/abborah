import { ValidationRule } from '@/domain/usecases/utils/validation-rule'
import { InvalidStartProjectDateError, ProjectInvalidDateRangeError } from '@/presentation/errors'

export class ProjectDateRule implements ValidationRule {
  validate (input: ProjectDateRule.Params): Error {
    const today = new Date()

    const startDate = input.startDate ? new Date(input.startDate) : new Date(today)
    const endDate = new Date(input.endDate)

    const differenceBetweenTodayAndStartdateInTime = today.getTime() - startDate.getTime()

    const differenceBetweenTodayAndStartdateInDays = differenceBetweenTodayAndStartdateInTime / (1000 * 3600 * 24)

    if (differenceBetweenTodayAndStartdateInDays >= 30) {
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
