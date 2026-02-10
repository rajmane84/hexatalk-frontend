import { useEffect, useState, useMemo } from "react";
import Notification from "../components/notification";
import SearchBar from "../components/search-bar";
import { getAllFriendRequests } from "../api/user.api";
import type { FriendRequest } from "../types/user.type";
import { motion, AnimatePresence } from "motion/react";

const NotificationPage = () => {
  const [allRequests, setAllRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserRequest = async () => {
      const requests = await getAllFriendRequests();

      if (requests) {
        setAllRequests(
          requests.filter((request: any) => request.status === "PENDING"),
        );
      }
    };

    fetchUserRequest();
  }, []);

  // Filter requests based on sender's name or username
  const filteredRequests = useMemo(() => {
    if (!allRequests) return [];
    if (!searchQuery) return allRequests;

    return allRequests.filter((request) => {
      const sender = request.from;

      const name = sender?.fullname || "";
      const username = sender?.username || "";

      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [allRequests, searchQuery]);

  const removeRequest = (requestId: string) => {
    setAllRequests((prev) => prev.filter((req) => req._id !== requestId));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-neutral-300">
          Notifications
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-64">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              placeholder="Search requests..."
            />
          </div>

          <button className="flex cursor-pointer items-center gap-2 rounded-md border border-white/25 px-4 py-2 transition-colors hover:bg-white/10">
            <span className="text-sm font-semibold text-neutral-100/80">
              Filters
            </span>
          </button>
        </div>
      </div>

      <div className="scrollbar-hide flex h-full flex-col gap-2 overflow-auto">
        <AnimatePresence mode="popLayout">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <motion.div
                key={request._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Notification request={request} onAccepted={removeRequest} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center text-neutral-500"
            >
              {searchQuery ? (
                <p>No requests found for "{searchQuery}"</p>
              ) : (
                <p>No new notifications</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationPage;
