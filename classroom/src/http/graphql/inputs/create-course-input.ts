import { Field, InputType, ObjectType } from "@nestjs/graphql";


@InputType()
export class CreateCourseInput {
  @Field()
  title: string;
}