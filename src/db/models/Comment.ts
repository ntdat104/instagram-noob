import { getModelForClass } from '@typegoose/typegoose';

// entities
import { Comment as CommentEntity } from '../entities';

export const Comment = getModelForClass(CommentEntity);
