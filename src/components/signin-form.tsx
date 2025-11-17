import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconLoader2 } from "@tabler/icons-react";
import clsx from "clsx";

const handleUserLogin = async (email: string, password: string) => {
  console.log(email, password);
  return { token: "1234567" };
};

interface ISignupError {
  email?: string;
  password?: string;
  api?: string;
}

function SignInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await handleUserLogin(email, password);
      const token = responseData.token;

      localStorage.setItem("token", token);
      setSuccessMessage("Login successful!");
      setErrors({});
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors({ api: error.message as string });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={clsx("w-full max-w-md space-y-6")} onSubmit={handleSubmit}>
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

      <button
        type="submit"
        disabled={isLoading}
        className={clsx(
          "inline-flex h-10 w-full items-center justify-center rounded-md",
          "bg-purple-500 font-medium text-white transition-all duration-300",
          "outline-none hover:bg-purple-600",
          "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isLoading ? (
          <>
            <IconLoader2 className={clsx("mr-2 h-4 w-4 animate-spin")} />
            Logging In...
          </>
        ) : (
          "Login"
        )}
      </button>

      {successMessage && (
        <p className={clsx("text-center text-sm text-green-400")}>
          {successMessage}
        </p>
      )}
    </form>
  );
}

export default SignInForm;
