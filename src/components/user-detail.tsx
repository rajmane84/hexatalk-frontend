import Avatar from "./avatar";
import { cn } from "../utils/cn";
import { CloseIcon, SearchIcon } from "./icons";
import { useState } from "react";
import SearchBar from "./search-bar";
import { motion, AnimatePresence } from "motion/react";

interface UserDetailProps {
  name?: string;
  avatarSrc?: string;
  onSearch?: (query: string) => void;
}

const UserDetail = ({
  name = "Raj Mane",
  avatarSrc,
  onSearch,
}: UserDetailProps) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Propagate changes to parent component to filter chat messages
    onSearch?.(value);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <div
      className={cn(
        "fixed top-16 left-[300px] z-40 flex h-12 w-[calc(100vw-300px)] items-center justify-between px-4 py-8",
        "border-b border-b-neutral-100/20 bg-neutral-900/50 backdrop-blur-md",
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar avatarUrl={avatarSrc} />
        <h1 className="text-md font-semibold text-neutral-300 select-none">
          {name}
        </h1>
      </div>

      <div className="relative">
        {!searchOpen && (
          <SearchIcon
            classname="cursor-pointer select-none text-neutral-400 hover:text-white"
            motionprops={{
              initial: false,
              whileTap: { scale: 0.8 },
              transition: { duration: 0.2 },
            }}
            onClick={() => setSearchOpen(true)}
          />
        )}

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute -top-6 right-0 flex w-[350px] items-center gap-2 rounded-lg border border-neutral-800 bg-black/90 p-2 shadow-2xl backdrop-blur-xl"
            >
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={() => {
                  setSearchQuery("");
                  onSearch?.("");
                }}
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

export default UserDetail;
