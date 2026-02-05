import { cn } from "../utils/cn";
import { SearchIcon } from "./icons";
import { IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

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
  const [focused, setFocused] = useState(false);

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
    <div className={cn("relative w-full overflow-hidden rounded-md", className)}>
      <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
        <SearchIcon classname="size-4" />
      </div>

      <input
        className={cn(
          "h-10 w-full rounded-md border border-neutral-800 bg-neutral-900/50",
          "py-2 pr-10 pl-10",
          "text-sm text-neutral-200 placeholder:text-neutral-500",
          "transition-colors duration-200 outline-none",
          "focus:border-neutral-700 focus:bg-neutral-900",
        )}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        {...props}
      />


      <motion.div
        className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-600 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ originX: 0 }}
      />

      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            onClick={handleClear}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <IconX size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
