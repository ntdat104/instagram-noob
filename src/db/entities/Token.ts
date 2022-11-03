import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Token {
  readonly _id!: mongoose.Types.ObjectId;

  @prop({ type: String, required: true, unique: true })
  userId!: string;

  @prop({ type: String, required: true, unique: true })
  token!: string;

  @prop({ type: Date, required: true, default: Date.now(), expires: 60 * 5 })
  createdAt!: Date;
}
