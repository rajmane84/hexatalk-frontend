import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "../utils/cn";
import SearchBar from "./search-bar";
import { IconUser, IconUsers, IconX, IconPlus } from "@tabler/icons-react";

interface IContactItem {
  name: string;
  subText?: string;
  isUser?: boolean;
  avatarSrc?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface ContactData {
  name: string;
  isUser?: boolean;
  isFrequentlyContacted?: boolean;
  avatarSrc?: string;
}

const ContactItem = ({
  name,
  subText,
  isUser = false,
  avatarSrc,
  onClick,
  icon,
}: IContactItem) => {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left",
        "transition-colors duration-200 ease-in-out",
        "hover:bg-neutral-800/50 active:bg-neutral-800/70",
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none",
      )}
    >
      <div className="relative shrink-0">
        {avatarSrc && !imgError ? (
          <img
            src={avatarSrc}
            alt={`${name}'s avatar`}
            onError={() => setImgError(true)}
            className="size-10 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full border shadow-sm",
              icon
                ? "border-emerald-600/30 bg-emerald-600/20 text-emerald-500"
                : "border-neutral-700 bg-neutral-600 text-neutral-200",
            )}
          >
            {icon ? (
              icon
            ) : isUser ? (
              <IconUser className="size-5" aria-hidden="true" />
            ) : (
              <IconUsers className="size-5" aria-hidden="true" />
            )}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate text-sm font-medium text-neutral-200 group-hover:text-white">
          {name}
        </p>
        {subText && (
          <p className="truncate text-xs text-neutral-500 group-hover:text-neutral-400">
            {subText}
          </p>
        )}
      </div>
    </button>
  );
};

const contactsData: ContactData[] = [
  { name: "Raj Mane", isUser: true, avatarSrc: "/avatar.png" },
  { name: "Bhargav Mhatre", isFrequentlyContacted: true },
  { name: "Raj Mane Jio", isFrequentlyContacted: true },
  { name: "Joel Lewis", isFrequentlyContacted: false },
  { name: "Satyam Clg", isFrequentlyContacted: true },
];

interface NewChatScreenProps {
  className?: string;
  onClose?: () => void;
}

const NewChatScreen = ({ className, onClose }: NewChatScreenProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contactsData;
    return contactsData.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const showGroups = searchQuery === "";
  const frequentContacts = showGroups
    ? filteredContacts.filter((c) => c.isFrequentlyContacted && !c.isUser)
    : [];
  const otherContacts = showGroups
    ? filteredContacts.filter((c) => !c.isFrequentlyContacted && !c.isUser)
    : filteredContacts;
  const userContact = showGroups
    ? filteredContacts.find((c) => c.isUser)
    : null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full max-h-[600px] w-full max-w-md flex-col overflow-hidden rounded-xl border border-neutral-800 bg-black shadow-2xl shadow-neutral-950",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          New Chat
        </h1>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          aria-label="Close"
        >
          <IconX className="size-5" />
        </button>
      </div>

      <div className="px-4 pb-2">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name or number..."
        />
      </div>

      <div className="scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent flex-1 overflow-y-auto px-2 pb-4">
        {!searchQuery && (
          <div className="mb-2">
            <ContactItem
              name="New Group"
              subText="Create a group for work or friends"
              icon={<IconPlus className="size-5" />}
              onClick={() => console.log("Navigating to create group...")}
            />
            <div className="mx-2 my-2 h-px bg-neutral-800" />
          </div>
        )}

        {userContact && !searchQuery && (
          <ContactItem
            name={`${userContact.name} (You)`}
            subText="Message yourself"
            avatarSrc={userContact.avatarSrc}
            isUser={true}
          />
        )}

        {frequentContacts.length > 0 && (
          <div className="mt-4">
            <h2 className="mb-1 px-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              Suggested
            </h2>
            {frequentContacts.map((contact, idx) => (
              <ContactItem
                key={`freq-${idx}`}
                name={contact.name}
                avatarSrc={contact.avatarSrc}
              />
            ))}
          </div>
        )}

        <div className="mt-4">
          {showGroups && otherContacts.length > 0 && (
            <h2 className="mb-1 px-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              All Contacts
            </h2>
          )}

          {otherContacts.length > 0 ? (
            otherContacts.map((contact, idx) => (
              <ContactItem
                key={`all-${idx}`}
                name={contact.name}
                avatarSrc={contact.avatarSrc}
              />
            ))
          ) : (
            <div className="py-8 text-center text-sm text-neutral-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChatScreen;