import { Ref } from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

import { User } from './User';

@ObjectType()
export class Comment extends TimeStamps {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field((_type) => User)
  @prop({ type: mongoose.Types.ObjectId, ref: () => User, required: true })
  user!: Ref<User>;

  @Field()
  @prop({ type: String, required: true })
  postId!: string;

  @Field()
  @prop({ type: String, required: true })
  caption!: string;

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, default: [] })
  reactions!: Ref<User>[];

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  updatedAt!: Date;
}
