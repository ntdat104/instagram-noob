import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref } from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

import { User } from './User';

@ObjectType()
export class Post extends TimeStamps {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  caption!: string;

  @Field((_type) => [User])
  @prop({ type: [mongoose.Types.ObjectId], ref: () => User, default: [] })
  reactions!: Ref<User>[];

  @Field({ nullable: true })
  @prop({ type: String, default: null })
  photo!: string;

  @Field((_type) => User)
  @prop({ type: mongoose.Types.ObjectId, ref: () => User, required: true })
  user!: Ref<User>;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  updatedAt!: Date;
}
