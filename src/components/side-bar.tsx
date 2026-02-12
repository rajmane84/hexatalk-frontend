import SearchBar from "./search-bar";
import { cn } from "../utils/cn";
import Chat from "./chat";
import { useEffect, useState, useMemo } from "react";
import { getAllFriends } from "../api/user.api";
import type { Friends } from "../types/user.type";
import { motion, AnimatePresence } from "motion/react";

function SideBar() {
  const [chatDetails, setChatDetails] = useState<Friends[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await getAllFriends();

      if (friends) {
        setChatDetails(friends);
      }
    };

    fetchFriends();
  }, []);

  const filteredChats = useMemo(() => {
    if (!searchQuery) return chatDetails;
    return chatDetails.filter((chat) => {
      const nameToCheck = chat.fullname || chat.username || "";
      return nameToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [chatDetails, searchQuery]);

  return (
    <div className="fixed inset-y-0 left-0 mt-16 min-h-screen w-[300px] space-y-4 border-r border-neutral-100/15 px-2">
      <div className="my-4 flex items-center justify-between px-2">
        <h1 className="text-xl font-semibold text-neutral-200 select-none">
          Chats
        </h1>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
        placeholder="Search chats..."
      />

      <div className="scrollbar-hide flex h-screen flex-col gap-3 overflow-y-auto pb-24">
        <AnimatePresence mode="popLayout">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Chat chat={chat} />
              </motion.div>
            ))
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-neutral-500"
            >
              {searchQuery
                ? `No chats found for "${searchQuery}"`
                : "You haven’t started any chats yet"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SideBar;
