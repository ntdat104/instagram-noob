import { FilterQuery as FilterQueryMongoose } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';

export enum ReactionType {
  LIKE = 'LIKE',
  UNLIKE = 'UNLIKE',
}

export type FilterQuery<T> = FilterQueryMongoose<DocumentType<T, BeAnObject>>;
