import SendMessage from "../components/send-message";
import UserDetail from "../components/user-detail";
import MessageBox from "../components/message-box";
import { useState } from "react";

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

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: msg, from: "me" },
    ]);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <UserDetail />
      <MessageBox messages={messages} />
      <SendMessage onSend={sendMessage} />
    </div>
  );
};

export default ChatPage;
