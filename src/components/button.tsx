import { motion, type HTMLMotionProps } from "motion/react";
import { IconLoader2, type ReactNode } from "@tabler/icons-react";
import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type Props = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium cursor-pointer" +
  "select-none transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-purple-600 text-white hover:bg-purple-600/80",
  secondary:
    "bg-neutral-700 text-neutral-100 border border-neutral-600 hover:bg-neutral-600",
  ghost: "bg-transparent border border-neutral-300/50 text-neutral-200 hover:bg-neutral-700/50 hover:border-neutral-200/50",
  danger:
    "bg-red-600 text-white hover:bg-red-600/80 focus-visible:ring-red-500/40",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isDisabled && "pointer-events-none opacity-60",
        className,
      )}
      {...props}
    >
      {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
      <span className={loading ? "opacity-80" : undefined}>
        {children as ReactNode}
      </span>
    </motion.button>
  );
}
