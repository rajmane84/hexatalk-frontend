import {
  useState,
  useMemo,
  useCallback,
  type ChangeEvent,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";

import Avatar from "./avatar";
import SearchBar from "./search-bar";
import { CloseIcon, SearchIcon } from "./icons";
import { cn } from "../utils/cn";
import { useChatStore } from "../store/chat.store";
import { useUserStore } from "../store/user.store";

interface UserDetailProps {
  onSearch?: (query: string) => void;
}

const ChatPageNavbar = ({ onSearch }: UserDetailProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentChat = useChatStore((state) => state.currentChat);
  const loggedInUsername = useUserStore((state) => state.username);

  if (!currentChat) return null;

  const { isGroupChat, members, _id: chatId } = currentChat;

  /**
   * Memoized friend computation
   */
  const friend = useMemo(() => {
    if (isGroupChat) return null;
    return (
      members.find((member) => member.username !== loggedInUsername) ?? null
    );
  }, [isGroupChat, members, loggedInUsername]);

  /**
   * Reset search when chat changes
   */
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, [chatId]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const handleClose = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    onSearch?.("");
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch?.("");
  }, [onSearch]);

  return (
    <div
      className={cn(
        "fixed top-16 left-[300px] z-40 flex h-12 w-[calc(100vw-300px)] items-center justify-between px-4 py-8",
        "border-b border-b-neutral-100/20 bg-neutral-900/50 backdrop-blur-md",
      )}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <Avatar avatarUrl={friend?.avatarUrl ?? "/avatar.png"} />

        {isGroupChat ? (
          <h1 className="text-md font-semibold text-neutral-300 select-none">
            Group Chat
          </h1>
        ) : (
          <div className="flex flex-col gap-0.5">
            <h1 className="text-md font-semibold text-neutral-300 select-none">
              {friend?.fullname ?? "Unknown User"}
            </h1>
            <span className="text-xs text-neutral-500 select-none">
              @{friend?.username ?? "unknown"}
            </span>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="relative">
        <AnimatePresence>
          {!searchOpen && (
            <SearchIcon
              classname="cursor-pointer select-none text-neutral-400 hover:text-white"
              motionprops={{
                initial: false,
                exit: { scale: 0 },
                whileTap: { scale: 0.85 },
                transition: { duration: 0.3 },
              }}
              onClick={() => setSearchOpen(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute -top-7 right-0 flex w-[350px] items-center gap-2 rounded-lg border border-neutral-800 bg-black/90 p-2 shadow-2xl backdrop-blur-xl"
            >
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={handleClear}
                placeholder="Find in chat..."
                autoFocus
              />
              <CloseIcon
                classname="cursor-pointer text-neutral-500 hover:text-neutral-200 shrink-0"
                onClick={handleClose}
                motionprops={{
                  whileHover: { rotate: 90, scale: 1.1 },
                  whileTap: { scale: 0.9 },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatPageNavbar;
