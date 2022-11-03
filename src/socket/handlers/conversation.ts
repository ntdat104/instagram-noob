// types
import { Handler } from '../types';

const conversationHandler: Handler = ({ socket, onlineUsers, currentUserId }) => {
  socket.on('sendStrangeConversation', ({ receiverId, conversationId }) => {
    const receivedSocketId = onlineUsers[receiverId]?.socketId;

    if (receivedSocketId == null) return;

    socket.to(receivedSocketId).emit('receiveStrangeConversation', conversationId);
  });

  socket.on('joinRooms', (conversationIds) => {
    const user = onlineUsers[currentUserId];

    if (user == null) return;

    user.roomIds = [...new Set([...user.roomIds, ...conversationIds])];

    socket.join(user.roomIds);
  });

  socket.on('setCurrentRoomId', (conversationId) => {
    const user = onlineUsers[currentUserId];

    if (user == null) return;

    user.currentRoomId = conversationId;
  });

  socket.on('sendMessage', (message, receiverIds) => {
    for (const receiverId of receiverIds) {
      const user = onlineUsers[receiverId];

      if (user == null) continue;

      if (user.currentRoomId === message.conversationId && user.userId !== currentUserId)
        message.seen = true;
    }

    // TODO: Only mark message as read when user in room is current (for group)
    socket.broadcast.to(message.conversationId).emit('receiveMessage', message);
  });

  socket.on('readMessage', (conversationId) => {
    socket.broadcast.to(conversationId).emit('receiveSeenConversationId', conversationId);
  });
};

export default conversationHandler;
