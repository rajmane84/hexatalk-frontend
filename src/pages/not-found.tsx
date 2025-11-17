const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">404</h1>
        <div className="h-10 w-px bg-neutral-200"></div>
        <p className="text-md text-neutral-400">This page could not be found</p>
      </div>
    </div>
  );
}

export default NotFound
