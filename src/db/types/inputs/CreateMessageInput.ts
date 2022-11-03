import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  text!: string;
}
