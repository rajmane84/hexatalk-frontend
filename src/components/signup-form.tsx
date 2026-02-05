import { useNavigate } from "react-router-dom";
import { useForm, type ErrorOption, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";
import FormInput from "./form-input";
import { useEffect } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { useUserStore } from "../store/user.store";
import { handleUserSignup } from "../api/auth.api";

type FormFields = {
  fullname: string;
  email: string;
  password: string;
  username: string;
};

function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "", username: "", password: "", fullname: "" },
  });

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //We don't have to do the prevent default because handleSubmit do that for us

    const { email, username, password, fullname  } = data;
    const response = await handleUserSignup({ username, email, password, fullname });

    if (!response.success) {
      setError("root", response.error?.message as ErrorOption);
    } else {
      const {token, payload} = response.data;
      setUser(payload.email, payload.username, payload.avatarUrl);

      localStorage.setItem("token", token);
      toast("Signed Up successfully ✅");
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
        label="Full Name"
        type="text"
        id="fullname"
        placeholder="Enter your full name"
        error={errors.email?.message}
        {...register("fullname", {
          required: "Full Name is required"
        })}
      />

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

      <FormInput
        label="Username"
        type="text"
        id="username"
        autoComplete="username"
        placeholder="Enter username"
        error={errors.username?.message}
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 5,
            message: "Username must be at least 5 characters",
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
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default SignUpForm;
