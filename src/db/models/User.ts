import { getModelForClass } from '@typegoose/typegoose';

// entities
import { User as UserEntity } from '../entities';

export const User = getModelForClass(UserEntity);
