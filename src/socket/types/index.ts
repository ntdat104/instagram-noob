import { NextApiResponse } from 'next';

import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Socket as NetSocket } from 'net';

export interface OnlineUsers {
  [userId: string]: User | null;
}

export interface CurrentSockets {
  [userId: string]: string[] | null;
}

export type Handler = (params: {
  io: ServerIO;
  socket: SocketIO;
  onlineUsers: OnlineUsers;
  currentSockets: CurrentSockets;
  currentUserId: string;
}) => void;

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HttpServer & {
      io: ServerIO;
    };
  };
};

export interface User {
  userId: string;
  socketId: string;
  roomIds: string[];
  currentRoomId: string | null;
}

export interface Message {
  _id: string;
  userId: string;
  text: string;
  conversationId: string;
  createdAt: string;
  seen: boolean;
}

interface ConversationEmits {
  receiveMessage: (response: Message) => void;
  receiveStrangeConversation: (conversationId: string) => void;
  receiveSeenConversationId: (conversationId: string) => void;
}

interface ConversationListens {
  sendMessage: (payload: Message, receiverIds: string[]) => void;
  joinRooms: (conversationIds: string[]) => void;
  sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
  setCurrentRoomId: (conversationId: string) => void;
  readMessage: (conversationId: string) => void;
}

interface UserEmits {
  receiveOnlineUserId: (userId: string) => void;
  receiveOfflineUserId: (userId: string) => void;
  receiveOnlineUserIds: (userIds: string[]) => void;
}

interface UserListens {
  addOnlineUser: () => void;
  getOnlineUserIds: () => void;
}

export type ServerToClientEvents = ConversationEmits & UserEmits;

export type ClientToServerEvents = ConversationListens & UserListens;

export type ServerIO = Server<ClientToServerEvents, ServerToClientEvents>;

export type SocketIO = Socket<ClientToServerEvents, ServerToClientEvents>;
