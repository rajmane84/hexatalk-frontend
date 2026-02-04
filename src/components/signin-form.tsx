import { useNavigate } from "react-router-dom";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm, type ErrorOption, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";
import clsx from "clsx";
import FormInput from "./form-input";
import { handleUserSignin } from "../api/auth.api";

interface FormFields {
  email: string;
  password: string;
}

function SignInForm() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<FormFields>({ defaultValues: { email: "", password: "" } });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    const response = await handleUserSignin({ email, password });

    if (!response.success) {
      const message = response.error?.message;
      setError("root", message as ErrorOption);
    } else {
      const { token, payload } = response.data;
      setUser(payload.email, payload.username);

      localStorage.setItem("token", token);
      toast("LoggedIn successfully ✅");
      navigate("/");
    }
  };

  useEffect(() => {
    if (errors.root?.message) {
      toast(errors.root.message);
    }
  }, [errors.root]);

  return (
    <form
      className="w-full max-w-md space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label="Email"
        type="text"
        id="email"
        placeholder="example@something.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Enter a valid email",
          },
        })}
      />

      <FormInput
        label="Password"
        type="password"
        id="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "inline-flex h-10 w-full items-center justify-center rounded-md",
          "transition-color bg-purple-500 font-medium text-white duration-300",
          "border-none from-purple-600 to-purple-500 hover:bg-linear-to-tr",
          "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isSubmitting ? (
          <>
            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging In...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}

export default SignInForm;
