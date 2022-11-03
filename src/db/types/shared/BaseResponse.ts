import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseResponse {
  @Field()
  code!: number;

  @Field()
  success!: boolean;

  @Field({ nullable: true })
  message?: string;
}
