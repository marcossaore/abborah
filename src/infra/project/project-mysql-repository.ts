import prisma from '@/infra/prisma-adapter/client'
import { AddProjectRepository } from '@/data/protocols/project/add-project-repository'
import { ProjectModel } from '@/domain/models/project/project'
import { AddProjectParams } from '@/domain/usecases/project/add-project'
import { LoadProjectByIdRepository } from '@/data/protocols/project/load-project-by-id-repository'

export class ProjectMysqlRepository implements AddProjectRepository, LoadProjectByIdRepository {
  async add (projectParam: AddProjectParams): Promise<ProjectModel> {
    return await prisma.project.create({
      data: projectParam
    })
  }

  async loadById (id: number): Promise<ProjectModel> {
    return await prisma.project.findFirst({
      where: {
        id
      }
    })
  }
}
