import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";
import axios from "axios";
import FormInput from "./form-input";
import { useEffect } from "react";

type FormFields = {
  email: string;
  password: string;
  username: string;
};

type ApiErrorResponse = {
  message: string;
}

function SignUpForm() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: { email: "", username: "", password: "" },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //We don't have to do the prevent default because handleSubmit do that for us
    try {
      await axios.post(
        `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/sign-up`,
        data,
        { withCredentials: true, timeout: 10_000 },
      );

      toast("Signup successfull ✅");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        console.log("Axios error:", error.response?.data?.message);

        setError("root", {
          message: (error.response?.data?.message ??
            "Something went wrong") as string,
        });
      } else if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Unexpected error" });
      }
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
          "bg-purple-500 font-medium text-white transition-color duration-300",
          "border-none hover:bg-linear-to-tr from-purple-600 to-purple-500",
          "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default SignUpForm;
