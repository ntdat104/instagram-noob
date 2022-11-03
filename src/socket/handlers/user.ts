// types
import { Handler } from '../types';

const userHandler: Handler = ({ socket, onlineUsers, currentSockets, currentUserId }) => {
  const socketId = socket.id;

  const addOnlineUser = () => {
    socket.broadcast.emit('receiveOnlineUserId', currentUserId);

    if (onlineUsers[currentUserId] != null) return;

    onlineUsers[currentUserId] = {
      userId: currentUserId,
      socketId: socketId,
      roomIds: [socketId],
      currentRoomId: null,
    };
  };

  // Track open new tab
  const addCurrentSocket = () => {
    if (onlineUsers[currentUserId] == null) currentSockets[currentUserId] = [socketId];
    else currentSockets[currentUserId]!.push(socketId);
  };

  const handleDisconnect = () => {
    const currentSocket = currentSockets[currentUserId];

    if (currentSocket == null) return;

    currentSocket.splice(currentSocket.indexOf(socketId), 1);

    if (currentSocket.length === 0) {
      delete currentSockets[currentUserId];
      delete onlineUsers[currentUserId];

      socket.broadcast.emit('receiveOfflineUserId', currentUserId);
    }
  };

  const receiveOnlineUserIds = () => {
    const userIds = Object.keys(onlineUsers);

    userIds.splice(userIds.indexOf(currentUserId), 1);

    return userIds;
  };

  socket.on('getOnlineUserIds', () => {
    socket.emit('receiveOnlineUserIds', receiveOnlineUserIds());
  });

  socket.on('addOnlineUser', () => {
    addCurrentSocket();
    addOnlineUser();
  });

  socket.on('disconnect', () => {
    handleDisconnect();

    socket.disconnect();
  });
};

export default userHandler;
