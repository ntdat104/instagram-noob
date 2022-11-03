import { ReactNode, createContext, useEffect, useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { io } from 'socket.io-client';

// types
import { SocketIO, SocketMessage } from '~/types/socket';

import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { useGetConversationByIdLazyQuery, useReadMessageMutation } from '~/types/generated';

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketInitContext {
  conversationHandler: {
    sendMessage: (message: SocketMessage, receiverIds: string[]) => void;
    sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
    setCurrentRoomId: (conversationId: string) => void;
    readMessage: (conversationId: string) => void;
  };
}

export const SocketContext = createContext<SocketInitContext>({
  conversationHandler: {
    sendMessage: () => {},
    sendStrangeConversation: () => {},
    setCurrentRoomId: () => {},
    readMessage: () => {},
  },
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketIO | null>(null);

  const { currentUser } = useAuthSelector();
  const { conversations } = useConversationSelector();

  const [getConversationById] = useGetConversationByIdLazyQuery();
  const [readMessage] = useReadMessageMutation();
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const currentUserId = currentUser?._id;

  const conversationHandler = useMemo(
    () => ({
      sendMessage(message: SocketMessage, receiverIds: string[]) {
        socket?.emit('sendMessage', message, receiverIds);
      },

      sendStrangeConversation(payload: { receiverId: string; conversationId: string }) {
        socket?.emit('sendStrangeConversation', payload);
      },

      setCurrentRoomId(conversationId: string) {
        socket?.emit('setCurrentRoomId', conversationId);
      },

      readMessage(conversationId: string) {
        socket?.emit('readMessage', conversationId);
      },
    }),
    [socket],
  );

  // Init socket
  useEffect(() => {
    if (currentUserId == null) return;

    (async () => {
      await fetch('/api/socket');

      const socket = io({
        withCredentials: true,
        query: {
          userId: currentUserId,
        },
      });

      setSocket(socket);
    })();
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId == null || socket == null) return;

    socket.emit('addOnlineUser');
  }, [currentUserId, socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.emit('getOnlineUserIds');
  }, [socket, router.pathname]);

  // Add new room(s) after fetching new conversations
  useEffect(() => {
    if (conversations.length === 0 || socket == null) return;

    socket.emit(
      'joinRooms',
      conversations.map((conversation) => conversation._id),
    );
  }, [socket, conversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receiveMessage', async (message) => {
      if (message.userId === currentUserId) return;

      dispatch(conversationActions.addIncomingSocketMessage(message));

      // If in current chat then mark message as read
      if (message.seen) {
        const response = await readMessage({
          variables: {
            messageId: message._id,
          },
        });

        if (response.data?.readMessage.success) socket.emit('readMessage', message.conversationId);
      }
    });

    socket.on('receiveSeenConversationId', (conversationId) => {
      dispatch(conversationActions.readMessage({ conversationId }));
    });

    socket.on('receiveOnlineUserId', (userId) => {
      dispatch(conversationActions.setOnlineStatus({ userId }));
    });

    socket.on('receiveOfflineUserId', (userId) => {
      dispatch(conversationActions.seOfflineStatus({ userId }));
    });

    socket.on('receiveOnlineUserIds', (userIds) => {
      dispatch(conversationActions.initOnlineStatus({ userIds }));
    });

    socket.on('receiveStrangeConversation', async (conversationId) => {
      const response = await getConversationById({
        variables: {
          conversationId,
        },
      });

      const data = response.data?.getConversationById;

      if (data?.success)
        dispatch(conversationActions.addConversation({ conversation: data.conversation! }));
    });

    return () => {
      socket.close();
    };
  }, [socket, currentUserId, readMessage, getConversationById, dispatch]);

  return (
    <SocketContext.Provider value={{ conversationHandler }}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
