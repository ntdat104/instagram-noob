import { getModelForClass } from '@typegoose/typegoose';

// entities
import { Post as PostEntity } from '../entities';

export const Post = getModelForClass(PostEntity);
