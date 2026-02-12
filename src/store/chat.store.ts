import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IMember {
  _id: string;
  fullname: string;
  username: string;
  avatarUrl: string;
}

export interface IChatDetails {
  _id: string;
  isGroupChat: boolean;
  members: IMember[];
}

interface ChatStore {
  currentChat: IChatDetails | null;
  socket: WebSocket | null;

  setCurrentChat: (chat: IChatDetails) => void;
  clearCurrentChat: () => void;

  connectSocket: (chatId: string) => void;
  disconnectSocket: () => void;
}


export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentChat: null,
      socket: null,

      setCurrentChat: (chat) =>
        set(() => ({
          currentChat: chat,
        })),

      clearCurrentChat: () =>
        set(() => ({
          currentChat: null,
        })),

      connectSocket: (chatId) => {
        const existing = get().socket;
        if (existing) return;

        const socket = new WebSocket(
          `ws://localhost:8081?chatId=${chatId}`
        );

        socket.onopen = () => {
          console.log("Socket connected");
        };

        socket.onclose = () => {
          console.log("Socket disconnected");
        };

        socket.onerror = (err) => {
          console.error("Socket error:", err);
        };

        set({ socket });
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
          socket.close();
        }

        set({ socket: null });
      },
    }),
    {
      name: "chat-details-storage",
      partialize: (state) => ({
        currentChat: state.currentChat,
      }),
    }
  )
);
