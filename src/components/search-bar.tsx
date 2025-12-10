import { cn } from "../utils/cn";
import { SearchIcon } from "./icons";
import { IconX } from "@tabler/icons-react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchBar = ({
  value,
  onChange,
  onClear,
  className,
  placeholder = "Search",
  ...props
}: SearchBarProps) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
        <SearchIcon classname="size-4" />
      </div>

      <input
        className={cn(
          "peer h-10 w-full rounded-md border border-neutral-800 bg-neutral-900/50",
          "py-2 pr-10 pl-10",
          "text-sm text-neutral-200 placeholder:text-neutral-500",
          "transition-all duration-200 outline-none",
          "focus:border-neutral-700 focus:bg-neutral-900",
          "focus:ring-1 focus:ring-purple-500/20",
        )}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 h-px w-0 bg-purple-600 transition-all duration-300 ease-out",
          "peer-focus:w-full",
        )}
      />

      {value && (
        <button
          onClick={handleClear}
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;