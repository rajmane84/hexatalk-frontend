const HomePage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-1">
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
    </div>
  );
};

export default HomePage;
