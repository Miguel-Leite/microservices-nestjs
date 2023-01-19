import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser, IAuthUser } from "src/http/auth/current-user";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";
import { CoursesService } from "../../../services/courses.service";
import { CreateCourseInput } from "../inputs/create-course-input";
import { Course } from "../models/course";

@Resolver(()=> Course)
export class CoursesResolver {
  constructor(
    private coursesServices: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ){}

  @Query(()=>[Course])
  // @UseGuards(AuthorizationGuard)
  async courses () {
    return await this.coursesServices.listAllCourses()
  }

  @Query(()=> Course)
  // @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: IAuthUser) {
    const student = await this.studentsService.getStudentByAuthUser(user.sub);

    if (!student) {
      throw new Error("Student not found.")
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if (!enrollment) {
      throw new UnauthorizedException("")
    }
    return await this.coursesServices.getCourseById(id);
  }

  @Mutation(()=> Course)
  // @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return await this.coursesServices.createCourse(data);
  }
}