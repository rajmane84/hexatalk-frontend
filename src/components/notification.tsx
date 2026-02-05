import Avatar from "./avatar";
import { cn } from "../utils/cn";
import type { FriendRequest } from "../types/user.type";
import { acceptRequest, declineRequest } from "../api/user.api";
import { toast } from "sonner";

const Notification = ({ request }: { request: FriendRequest }) => {
  const handleAcceptRequest = async () => {
    const response = await acceptRequest(request._id);

    if (response === null) return;

    toast.success("🎉 You’re now friends!");

    return;
  };

  const handleDeclineRequest = async () => {
    const response = await declineRequest(request._id);

    if (response === null) return;
    toast.success("❎ Friend request declined");

    return;
  };

  return (
    <div
      className={cn(
        "flex min-h-20 w-full items-center justify-between",
        "rounded-xl border border-neutral-100/20 px-4",
      )}
    >
      <div className={cn("flex items-center gap-4")}>
        <Avatar height={50} width={50} size={12} />
        <div className={cn("flex flex-col gap-0.5")}>
          <h1 className={cn("text-lg font-semibold text-neutral-300")}>
            {request?.from.fullname || "Fallback name"}
          </h1>
          <span className={cn("text-sm font-medium text-neutral-100/50")}>
            {request?.from.username || "Fallback username"}
          </span>
        </div>
      </div>

      <div className={cn("mr-4 flex items-center gap-4")}>
        <button
          onClick={handleAcceptRequest}
          className={cn(
            "cursor-pointer rounded-md px-4 py-1 text-shadow-lg",
            "border border-blue-600/75 bg-blue-500/75",
            "hover:bg-blue-600/50",
          )}
        >
          Accept
        </button>

        <button
          onClick={handleDeclineRequest}
          className={cn(
            "cursor-pointer rounded-md px-4 py-1 text-shadow-lg",
            "border border-neutral-600/75 bg-neutral-900/75",
            "hover:bg-neutral-900/50",
          )}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default Notification;
