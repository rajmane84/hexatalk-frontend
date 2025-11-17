import clsx from "clsx";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  id,
  className,
  ...rest
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-purple-200">
        {label}
      </label>

      <input
        id={id}
        aria-invalid={!!error}
        className={clsx(
          "flex h-10 w-full rounded-md border border-neutral-600 bg-neutral-700 px-3 py-2",
          "text-base text-neutral-100 placeholder-neutral-400",
          "transition-all outline-none",
          "focus-visible:ring-1 focus-visible:ring-purple-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500 focus-visible:ring-red-500/50",
          className,
        )}
        {...rest}
      />

      {error && <p className="text-sm text-purple-400">{error}</p>}
    </div>
  );
}
