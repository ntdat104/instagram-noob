import { prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

import { User } from './User';

@ObjectType()
export class Conversation {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, required: true })
  creators!: Ref<User>[];

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, required: true })
  members!: Ref<User>[];

  @Field((_type) => Date)
  @prop({ type: Date, default: Date.now })
  createdAt!: Date;
}
