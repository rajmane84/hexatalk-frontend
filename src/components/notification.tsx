import Avatar from './avatar';

const Notification = () => {
  return (
    <div className="flex min-h-20 w-full items-center justify-between rounded-xl border border-neutral-100/20 px-4">
      <div className="flex items-center gap-4">
        <Avatar height={50} width={50} size={12} />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg font-semibold text-neutral-300">Raj Mane</h1>
          <span className="text-sm font-medium text-neutral-100/50">
            rajmane84
          </span>
        </div>
      </div>
      <div className="mr-4 flex items-center gap-4">
        <button className="hover:blue-800 cursor-pointer rounded-md border-1 border-blue-600/75 bg-blue-500/75 px-4 py-1 text-shadow-lg">
          Accept
        </button>
        <button className="cursor-pointer rounded-md border-1 border-neutral-600/75 bg-neutral-900/75 px-4 py-1 text-shadow-lg hover:bg-neutral-900/50">
          Decline
        </button>
      </div>
    </div>
  );
};

export default Notification;
