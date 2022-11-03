import { getModelForClass } from '@typegoose/typegoose';

// entities
import { Message as MessageEntity } from '../entities';

export const Message = getModelForClass(MessageEntity);
