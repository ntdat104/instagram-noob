import { getModelForClass } from '@typegoose/typegoose';

// entities
import { Conversation as ConversationEntity } from '../entities';

export const Conversation = getModelForClass(ConversationEntity);
