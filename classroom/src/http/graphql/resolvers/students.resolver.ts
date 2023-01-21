import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";
import { Student } from "../models/student";

@Resolver(()=> Student)
export class StudentsResolver {

  constructor(
    private studentsServices: StudentsService,
    private enrollmentsService: EnrollmentsService,
    ){}

  @Query(()=>[Student])
  @UseGuards(AuthorizationGuard)
  async students () {
    return await this.studentsServices.listAllStudents()
  }

  // @Query(()=>[Student])
  // @UseGuards(AuthorizationGuard)
  // async me(@CurrentUser() user: IAuthUser) {
  //   return await this.studentsServices.getStudentByAuthUser(user.sub)
  // }

  @ResolveField()
  async enrollments(@Parent() student: Student) {
    return await this.enrollmentsService.listEnrollmentByStudent(student.id);
  }
}