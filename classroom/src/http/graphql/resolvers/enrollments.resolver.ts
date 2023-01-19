import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CoursesService } from "src/services/courses.service";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";
import { Course } from "../models/course";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(()=> Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsServices: EnrollmentsService,
    private coursesServices: CoursesService,
    private studentsService: StudentsService,
    ){}

  @Query(()=>[Enrollment])
  // @UseGuards(AuthorizationGuard)
  async enrollments () {
    return await this.enrollmentsServices.listAllEnrollments()
  }

  @ResolveField()
  async student(@Parent() enrollment: Enrollment) {
    return await this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  async course(@Parent() enrollment: Enrollment) {
    return await this.coursesServices.getCourseById(enrollment.courseId);
  }
}