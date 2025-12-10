import { useEffect, useState, useMemo } from "react";
import Notification from "../components/notification";
import SearchBar from "../components/search-bar";
import { getAllFriendRequests } from "../api/user.api";
import type { FriendRequest } from "../types/user.type";

const NotificationPage = () => {
  const [allRequests, setAllRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const requests = await getAllFriendRequests();
        if (requests) {
          setAllRequests(
            requests.filter((request) => request.status === "PENDING"),
          );
        }
      } catch (error) {
        console.error("Failed to fetch all requests", error);
      }
    };

    fetchRequest();
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
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request, idx) => (
            <Notification request={request} key={idx} />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-neutral-500">
            {searchQuery ? (
              <p>No requests found for "{searchQuery}"</p>
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;