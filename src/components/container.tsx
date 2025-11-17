import SideBar from "./side-bar";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen pt-16 ml-[300px]">
      <SideBar />
      {children}
    </div>
  );
};

export default Container;
