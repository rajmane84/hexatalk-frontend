import { useEffect, useMemo, useState } from "react";
import SearchBar from "./search-bar";
import { getAllFriendSuggestions, sendFriendRequest } from "../api/user.api";

type FriendSuggestion = {
  _id: string;
  fullname: string;
  username: string;
  avatarUrl?: string;
};

const FriendsSidebar = () => {
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState<FriendSuggestion[]>([]);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  async function fetchSuggestions() {
    const suggestions = await getAllFriendSuggestions();
    if (suggestions) setSuggestions(suggestions);
  }

  async function handleAddFriend(user: FriendSuggestion) {
    setRequestedIds((prev) => [...prev, user._id]);

    const response = await sendFriendRequest(user.username);

    if (!response.success) {
      setRequestedIds((prev) => prev.filter((id) => id !== user._id));
      return;
    }
  }

  const filteredSuggestions = useMemo(() => {
    const lowerSearch = searchVal.toLowerCase();
    return suggestions.filter(
      (user) =>
        user.fullname.toLowerCase().includes(lowerSearch) ||
        user.username.toLowerCase().includes(lowerSearch),
    );
  }, [searchVal, suggestions]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="flex w-82 flex-col border-l border-neutral-800">
      <div className="flex flex-col gap-4 border-b border-neutral-800 px-4 py-4">
        <h2 className="text-sm font-semibold text-neutral-200">Find Friends</h2>

        <SearchBar
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {filteredSuggestions.length === 0 && (
          <p className="px-2 text-sm text-neutral-500">No users found</p>
        )}

        {filteredSuggestions.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullname}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 text-sm font-medium text-neutral-200">
                  {user.fullname[0]}
                </div>
              )}

              {/* Info */}
              <div className="flex flex-col">
                <span className="text-sm text-neutral-200">
                  {user.fullname}
                </span>
                <span className="text-xs text-neutral-500">
                  @{user.username}
                </span>
              </div>
            </div>

            <button
              disabled={requestedIds.includes(user._id)}
              aria-disabled={requestedIds.includes(user._id)}
              onClick={() => handleAddFriend(user)}
              className={`rounded-lg px-3 py-1 text-xs font-medium text-white transition ${
                requestedIds.includes(user._id)
                  ? "cursor-not-allowed bg-neutral-700"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {requestedIds.includes(user._id) ? "Requested" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsSidebar;
