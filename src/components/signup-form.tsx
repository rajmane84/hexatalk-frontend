// import { handleUserSignup } from "@/utils/auth.helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface ISignupError {
  username?: string;
  password?: string;
  api?: string;
}

const handleUserSignup = async (
  email: string,
  password: string,
  username: string,
) => {
  console.log(username, password, email);
};

function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errors, setErrors] = useState<{
    password?: string;
    username?: string;
    api?: string;
  }>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    const newErrors: ISignupError = {};

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (username.length < 3 || username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await handleUserSignup(email, password, username);
      setSuccessMessage("Sign-up successful!");
      setErrors({});
      navigate("/sign-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors({ api: error.message as string });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={clsx("w-full max-w-md space-y-6")} onSubmit={handleSubmit}>
      {/* Email */}
      <div className={clsx("space-y-2")}>
        <label
          htmlFor="email"
          className={clsx("text-sm font-medium text-purple-200")}
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={clsx(
            "flex h-10 w-full rounded-md border border-neutral-600 bg-neutral-700 px-3 py-2",
            "text-base text-neutral-100 placeholder-neutral-400",
            "transition-all outline-none",
            "focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
            "ring-offset-purple-900",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          )}
          autoComplete="email"
          placeholder="example@something.com"
        />

        {errors.api && (
          <p className={clsx("text-sm text-purple-400")}>{errors.api}</p>
        )}
      </div>

      {/* Password */}
      <div className={clsx("space-y-2")}>
        <label
          htmlFor="password"
          className={clsx("text-sm font-medium text-purple-200")}
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={clsx(
            "flex h-10 w-full rounded-md border border-neutral-600 bg-neutral-700 px-3 py-2",
            "text-base text-neutral-100 placeholder-neutral-400",
            "transition-all outline-none",
            "focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
            "ring-offset-purple-900",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          )}
          autoComplete="current-password"
          placeholder="Enter your password"
        />

        {errors.password && (
          <p className={clsx("text-sm text-purple-400")}>{errors.password}</p>
        )}
      </div>

      {/* Username */}
      <div className={clsx("space-y-2")}>
        <label
          htmlFor="username"
          className={clsx("text-sm font-medium text-purple-200")}
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={clsx(
            "flex h-10 w-full rounded-md border border-neutral-600 bg-neutral-700 px-3 py-2",
            "text-base text-neutral-100 placeholder-neutral-400",
            "transition-all outline-none",
            "focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
            "ring-offset-purple-900",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          )}
          autoComplete="username"
          placeholder="Username"
        />

        {errors.username && (
          <p className={clsx("text-sm text-purple-400")}>{errors.username}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          "inline-flex h-10 w-full items-center justify-center rounded-md",
          "bg-purple-500 font-medium text-white transition-all duration-300",
          "outline-none hover:bg-purple-600",
          "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {successMessage && (
        <p className={clsx("text-center text-sm text-green-400")}>
          {successMessage}
        </p>
      )}
    </form>
  );
}

export default SignUpForm;
