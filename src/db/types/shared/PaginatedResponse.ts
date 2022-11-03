import { Field, ObjectType } from 'type-graphql';

// types
import { BaseResponse } from './BaseResponse';

@ObjectType()
export class PaginatedResponse extends BaseResponse {
  @Field((_type) => String, { nullable: true })
  cursor?: string | null;

  @Field((_type) => Boolean, { nullable: true })
  hasMore?: boolean;
}
