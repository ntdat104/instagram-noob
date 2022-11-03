import { getModelForClass } from '@typegoose/typegoose';

// entities
import { Token as TokenEntity } from '../entities';

export const Token = getModelForClass(TokenEntity);
