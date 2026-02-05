import FriendsSidebar from "../components/suggestion-sidebar";

const HomePage = () => {
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col items-center justify-center gap-1 flex-1">
        <img
          alt="hexatalk-logo"
          src={"/hexatalk-logo.svg"}
          height={200}
          width={200}
          className="mb-4 size-30"
        />
        <h1 className="text-4xl font-bold tracking-tight text-neutral-300">
          HexaTalk
        </h1>
        <p className="text-sm text-neutral-500">
          Send and Receive messages without keeping your phone online.
        </p>
      </div>
      
      <FriendsSidebar />
    </div>
  );
};

export default HomePage;
