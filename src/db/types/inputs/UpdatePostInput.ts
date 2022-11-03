import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  postId!: string;

  @Field({ nullable: true })
  caption?: string;

  @Field({ nullable: true })
  newBase64Photo?: string;

  @Field({ nullable: true })
  oldPhotoUrl?: string;
}
