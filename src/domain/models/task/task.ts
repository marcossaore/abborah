export type TaskModel = {
  id: number
  projectId: number
  name: string
  description?: string
  startDate: Date
  endDate: Date
  finished?: boolean
}

export type TasksModel = TaskModel[]
