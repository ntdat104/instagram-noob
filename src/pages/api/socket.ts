import { NextApiRequest } from 'next';

import { Server as ServerIO } from 'socket.io';

// types
import {
  ClientToServerEvents,
  CurrentSockets,
  Handler,
  NextApiResponseServerIO,
  OnlineUsers,
  ServerToClientEvents,
} from '~/socket/types';

import conversationHandler from '~/socket/handlers/conversation';
import userHandler from '~/socket/handlers/user';

const socketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;

    const io = new ServerIO<ClientToServerEvents, ServerToClientEvents>(httpServer);

    res.socket.server.io = io;

    console.log('Socket connected 🍺');

    // Put vars outside to avoid reset when new user connected
    const onlineUsers: OnlineUsers = {};
    const currentSockets: CurrentSockets = {};

    io.on('connection', (socket) => {
      const handlerParams: Parameters<Handler>[0] = {
        io,
        socket,
        onlineUsers,
        currentSockets,
        currentUserId: socket.handshake.query.userId as string,
      };

      userHandler(handlerParams);
      conversationHandler(handlerParams);
    });
  } else {
    console.log('Socket already connected ⚡');
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketHandler;
