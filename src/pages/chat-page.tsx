import SendMessage from "../components/send-message";
import MessageBox from "../components/message-box";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChatDetails } from "../api/chat.api";
import { fetchMessages } from "../api/message.api";
import { useChatStore } from "../store/chat.store";
import ChatPageNavbar from "../components/chat-page-navbar";

export interface IMessage {
  id: number;
  text: string;
  from: "me" | "other";
}

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    { id: 1, text: "Hey, how are you?", from: "other" },
    { id: 2, text: "I’m good! Working on a project.", from: "me" },
    { id: 3, text: "Nice! What project?", from: "other" },
    { id: 4, text: "A chat app built with Next.js 😄", from: "me" },
  ]);

  const { chatId } = useParams();
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);

  useEffect(() => {
    const fetchChatInfo = async () => {
      if (!chatId) return;

      const response = await fetchChatDetails(chatId);

      if (!response.success) return;
      setCurrentChat(response.data);
    };

    fetchChatInfo();
  }, [chatId]);

  // As soon as we land on this page we need to create a ws connection

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: msg, from: "me" },
    ]);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <ChatPageNavbar />
      <MessageBox messages={messages} />
      <SendMessage onSend={sendMessage} />
    </div>
  );
};

export default ChatPage;
