import { Field, ObjectType } from 'type-graphql';

// types
import { BaseResponse, FieldError } from '.';

@ObjectType()
export class MutationResponse extends BaseResponse {
  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
