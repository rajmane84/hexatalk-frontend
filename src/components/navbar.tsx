import clsx from "clsx";
import Avatar from "./avatar";
import { useState } from "react";
import ProfileMenu from "./profile-menu";
import { LogoutIcon, SettingsIcon, SparkleIcon, UserIcon } from "./icons";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "./container";
import { handleUserLogout } from "../api/auth.api";
import { useUserStore } from "../store/user.store";

export interface IMenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const menuItems: IMenuItem[] = [
  {
    label: "Profile",
    icon: <UserIcon />,
    onClick: () => console.log("Go to profile"),
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    onClick: () => console.log("Open settings"),
  },
  {
    label: "Logout",
    icon: <LogoutIcon />,
    onClick: () => handleUserLogout(),
  },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const avatarUrl = useUserStore(state => state.avatarUrl);

  return (
    <>
      <div
        className={clsx(
          "insex-x-0 fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b border-b-white/25 px-[100px] py-2",
          "bg-linear-to-tr from-white/15 to-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.4)] backdrop-blur-md",
        )}
      >
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-4"
        >
          <img
            alt="hexatalk-logo"
            src={"/hexatalk-logo.svg"}
            height={100}
            width={100}
            className="size-10"
          />
          <h1 className="pointer-events-none text-xl font-semibold tracking-tight text-neutral-300">
            HexaTalk
          </h1>
        </div>
        <button
          onClick={() => navigate("/random-talk")}
          className={clsx(
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.4)] backdrop-blur-md",
            "border border-transparent hover:border-white/10 hover:bg-linear-to-tr hover:from-white/15 hover:to-black/30",
            "relative h-10 cursor-pointer rounded-md",
            "flex items-center justify-center px-4",
          )}
        >
          <span className="text-sm text-neutral-100/75">
            Talk with Random People
          </span>
          <SparkleIcon className="absolute -top-2 -right-3 fill-yellow-600" />
        </button>
        <div className="relative flex items-center gap-8">
          <BellIcon
            className="cursor-pointer"
            onClick={() => navigate("/notifications")}
          />
          <div className="absolute top-2 left-3 size-2 rounded-full bg-green-500"></div>
          <Avatar onClick={() => setOpen((prev) => !prev)} avatarUrl={avatarUrl}/>
          {open && (
            <ProfileMenu
              items={menuItems}
              onClose={() => setOpen(false)}
              positionClass="top-14 right-0"
            />
          )}
        </div>
      </div>

      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Navbar;

const BellIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(className)}
      onClick={onClick}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
};
