import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";
import FormInput from "./form-input";
import { handleUserSignin } from "../api/auth.api";
import Button from "./button";

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
      setError("root", {
        type: "manual",
        message,
      });
    } else {
      const { token, payload } = response.data;
      setUser(payload.email, payload.username, payload.avatarUrl);

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
      className="w-full max-w-md space-y-5"
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
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
}

export default SignInForm;
