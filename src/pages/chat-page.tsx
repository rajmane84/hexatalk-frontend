import SendMessage from "../components/send-message";
import UserDetail from "../components/user-detail";
import MessageBox from "../components/message-box";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChatDetails } from "../api/chat.api";
import { fetchMessages } from "../api/message.api";
import { useUserStore } from "../store/user.store";

export interface IMessage {
  id: number;
  text: string;
  from: "me" | "other";
}

interface IMember {
  _id: string;
  fullname: string;
  username: string;
  avatarUrl: string;
}

interface IChatDetails {
  _id: string;
  isGroupChat: boolean;
  members: IMember[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    { id: 1, text: "Hey, how are you?", from: "other" },
    { id: 2, text: "I’m good! Working on a project.", from: "me" },
    { id: 3, text: "Nice! What project?", from: "other" },
    { id: 4, text: "A chat app built with Next.js 😄", from: "me" },
  ]);

  const { chatId } = useParams();

  const [chatDetails, setChatDetails] = useState<IChatDetails | null>(null);

  const loggedInUserUsername = useUserStore((state) => state.username);

  useEffect(() => {
    const fetchChatInfo = async () => {
      if (!chatId) return;

      const response = await fetchChatDetails(chatId);
      console.log(response);

      if (!response.success) return;
      setChatDetails(response.data);
    };

    fetchChatInfo();
  }, [chatId]);

  const friend =
    chatDetails?.members.find(
      (member) => member.username !== loggedInUserUsername,
    ) || null;

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
      {chatDetails && friend && (
        <UserDetail
          chatDetails={{
            _id: friend._id,
            fullname: friend.fullname,
            username: friend.username,
            avatarUrl: friend.avatarUrl,
            isGroupChat: chatDetails.isGroupChat,
          }}
        />
      )}

      <MessageBox messages={messages} />
      <SendMessage onSend={sendMessage} />
    </div>
  );
};

export default ChatPage;
