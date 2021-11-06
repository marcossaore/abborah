import prisma from '@/infra/prisma-adapter/client'
import { AddProjectRepository } from '@/data/protocols/project/add-project-repository'
import { ProjectModel } from '@/domain/models/project/project'
import { AddProjectParams } from '@/domain/usecases/project/add-project'

export class ProjectMysqlRepository implements AddProjectRepository {
  async add (projectParam: AddProjectParams): Promise<ProjectModel> {
    return await prisma.project.create({
      data: projectParam
    })
  }
}
