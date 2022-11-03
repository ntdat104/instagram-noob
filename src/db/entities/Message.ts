import { Ref } from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoose from 'mongoose';

import { User } from './User';

@ObjectType()
export class Message {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field()
  @prop({ required: true })
  conversationId!: string;

  @Field((_type) => User)
  @prop({ type: mongoose.Types.ObjectId, ref: () => User, required: true })
  user!: Ref<User>;

  @Field()
  @prop({ type: String, required: true })
  text!: string;

  @Field((_type) => Date)
  @prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Field((_type) => Boolean)
  @prop({ type: Boolean, default: false })
  seen!: boolean;
}
