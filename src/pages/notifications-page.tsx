import Notification from "../components/notification";
import SearchBar from "../components/search-bar";

const NotificationPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-neutral-300">
          Notifications
        </h1>
        <div className="flex items-center gap-3">
          <SearchBar />
          <div className="flex cursor-pointer items-center gap-2 rounded-md border border-white/25 px-4 py-2 hover:bg-linear-to-t hover:from-white/15 hover:to-black/30">
            <span className="text-sm font-semibold text-neutral-100/80">
              Filters
            </span>
          </div>
        </div>
      </div>

      <div className="scrollbar-hide flex h-full flex-col gap-2 overflow-auto">
        <Notification />
      </div>
    </div>
  );
};

export default NotificationPage;
