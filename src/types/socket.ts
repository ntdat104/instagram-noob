import { Socket } from 'socket.io-client';

export interface SocketMessage {
  _id: string;
  userId: string;
  text: string;
  conversationId: string;
  createdAt: string;
  seen: boolean;
}

interface ConversationEmits {
  sendMessage: (payload: SocketMessage, receiverIds: string[]) => void;
  joinRooms: (conversationIds: string[]) => void;
  sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
  setCurrentRoomId: (conversationId: string) => void;
  readMessage: (conversationId: string) => void;
}

interface ConversationListens {
  receiveMessage: (response: SocketMessage) => void;
  receiveStrangeConversation: (conversationId: string) => void;
  receiveSeenConversationId: (conversationId: string) => void;
}

interface UserEmits {
  addOnlineUser: () => void;
  getOnlineUserIds: () => void;
}

interface UserListens {
  receiveOnlineUserId: (userId: string) => void;
  receiveOfflineUserId: (userId: string) => void;
  receiveOnlineUserIds: (userIds: string[]) => void;
}

export type ServerToClientEvents = ConversationListens & UserListens;

export type ClientToServerEvents = ConversationEmits & UserEmits;

export type SocketIO = Socket<ServerToClientEvents, ClientToServerEvents>;
