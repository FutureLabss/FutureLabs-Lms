import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@/shared/components/common/icon";
import Button from "@/shared/components/common/Button";

const schema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Use at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Error path
    message: "Passwords must match",

  });

type FormData = z.infer<typeof schema>;

export default function CreatePassword() {

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);

    reset();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  return (
    <div className="flex flex-col px-4 md:px-[70px]" >
      <div className="py-4">
        <Icon.Futurelogo className="w-[156px] h-24" />
      </div>
      <div className="flex flex-col md:flex-row justify-betweenborder gap-8">
        <div className=" bg-primary flex items-end justify-center flex-1  h-[50rem]">
          <Image
            src="/images/createpassword.png" // Replace with your actual image path
            alt="Illustration"
            width={560}
            height={560}
          />
        </div>

        <div className="flex flex-col flex-1 justify-center items-center gap-8 p-4 md:p-12">
          <h1 className="text-[1.625rem] font-bold">Create password</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-col flex gap-8">
            {/* Password Field */}
            <div className="form-group">
              <input
                type="email"
                placeholder="Johndoe@gmail.com"
                className=" bg-[#F2F2F2] border-[.5px] border-[#E5E5E5] rounded-[5px] w-full p-2"
              />
            </div>
            <div className="form-group">
              <div className=" bg-[#F2F2F2] flex items-center border-[.5px] border-[#E5E5E5] rounded-[5px] w-full p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="flex-1 bg-transparent outline-none"
                />
                <div onClick={handleShowPassword} className="cursor-pointer">
                  {
                    showPassword ? <Icon.EyeIcon className="" /> : <Icon.EyeSlashIcon className="w-4 h-4" />
                  }

                </div>
              </div>
              {errors.password && (
                <p className="text-secondary text-[10px]">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className="bg-[#F2F2F2] border-[.5px] border-[#E5E5E5] rounded-[5px] w-full p-2"
              />
              {errors.confirmPassword && (
                <p className="text-secondary text-[10px]">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 transition-all peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white  after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className=" text-white text-[20px] font-bold px-4 py-[12px]"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div >
  );
}
