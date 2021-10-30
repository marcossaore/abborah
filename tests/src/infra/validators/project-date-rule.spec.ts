import { ValidationRule } from '@/domain/usecases/utils/validation-rule'
import { ProjectDateRule } from '@/infra/validators/project-date-rule'
import { InvalidStartProjectDateError, ProjectInvalidDateRangeError } from '@/presentation/errors'

const makeSut = (): ValidationRule => new ProjectDateRule()

describe('ProjectDateRule', () => {
  test('should return an error if startDate is older than 30 days', async () => {
    const sut = makeSut()
    const today = new Date()
    const todayClone = new Date(today)
    const fiftyDaysBefore = (new Date(todayClone.setMonth(today.getMonth() - 3))).toString()
    const request = {
      startDate: fiftyDaysBefore,
      endDate: today.toString()
    }
    const error = await sut.validate(request)
    expect(error).toEqual(new InvalidStartProjectDateError())
  })

  test('should return an error if endDate is less than startDate', async () => {
    const sut = makeSut()
    const today = new Date()
    const todayClone = new Date(today)
    const endDateWrong = (new Date(todayClone.setDate(today.getDate() - 4))).toString()
    const startDate = (new Date(todayClone.setDate(today.getDate() - 4))).toString()
    const request = {
      startDate: startDate,
      endDate: endDateWrong
    }
    request.startDate = startDate
    request.endDate = endDateWrong
    const error = await sut.validate(request)
    expect(error).toEqual(new ProjectInvalidDateRangeError())
  })
})
