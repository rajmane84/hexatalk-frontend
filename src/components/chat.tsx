import Avatar from "./avatar";
import { DoubleTickIcon } from "./icons";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Friends } from "../types/user.type";

const Chat = ({ chat }: { chat: Friends }) => {
  const [lastMessageSeen, setLastMessageSeen] = useState<boolean>(false);
  const navigate = useNavigate();

  const {fullname, unreadCount, chatId} = chat;

  const handleClick = () => {
    setLastMessageSeen((prev) => !prev);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full cursor-pointer items-center gap-4 rounded-md border border-neutral-100/15 p-2 hover:bg-neutral-900"
    >
      <Avatar />
      <div className="flex flex-col gap-0.5">
        <h1 className="text-md font-semibold text-white">{fullname}</h1>
        <div className="flex items-center gap-0.5">
          <DoubleTickIcon
            className={clsx(
              "size-4",
              !lastMessageSeen ? "text-neutral-400" : "text-blue-400",
            )}
          />
          <p className="text-xs font-medium text-neutral-400">Good night!!</p>
        </div>
      </div>
      {unreadCount > 0 && <div className="absolute top-4 right-2 flex size-6 items-center justify-center rounded-full bg-purple-600">
        <span className="text-xs text-white">{unreadCount}</span>
      </div>}
    </div>
  );
};

export default Chat;
