import clsx from "clsx";
import type { IMenuItem } from "./navbar";

interface ProfileMenuProps {
  items: IMenuItem[];
  onClose?: () => void;
  positionClass?: string; // optional — e.g., "top-14 right-10"
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  items,
  onClose,
  positionClass = 'top-14 right-10',
}) => {
  return (
    <div
      className={clsx(
        'scrollbar-hide absolute flex flex-col overflow-auto rounded-md border backdrop-blur-md',
        'max-h-[300px] min-h-[150px] w-[200px]',
        'divide-y divide-neutral-700/50 border-neutral-100/25 bg-black',
        'bg-gradient-to-tr from-white/15 to-black/30 shadow-[var(--shadow-aceternity)] backdrop-blur-md',
        positionClass,
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            item.onClick?.();
            onClose?.();
          }}
          className={clsx(
            'flex h-12 w-full cursor-pointer items-center gap-3 p-4 transition-all duration-100',
            'text-neutral-200/75 hover:bg-black/50 hover:text-white',
          )}
        >
          {/* 👇 Icon (optional) */}
          {item.icon && (
            <span className="text-lg text-neutral-200/75 transition-colors group-hover:text-white">
              {item.icon}
            </span>
          )}

          <h1 className="text-sm font-medium">{item.label}</h1>
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;