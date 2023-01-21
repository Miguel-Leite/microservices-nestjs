import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface ICreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

interface IGetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  async getByCourseAndStudentId({ courseId,studentId }: IGetByCourseAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      }
    })
  }

  async listAllEnrollments() {
    return await this.prisma.enrollment.findMany({
      where:{
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async listEnrollmentByStudent(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async createEnrollment({ courseId,studentId }: ICreateEnrollmentParams) {
    return await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      }
    })
  }
}