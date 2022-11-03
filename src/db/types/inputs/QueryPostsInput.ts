import { Field, InputType } from 'type-graphql';

@InputType()
export class QueryPostsInput {
  @Field()
  field!: string;

  @Field()
  value!: string;
}
