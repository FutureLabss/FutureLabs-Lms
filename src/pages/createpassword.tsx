import Image from "next/image";
import logo from "../assets/logo.png";
import auth from "../assets/auth.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/shared/context/auth";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Use at least 8 characters, including uppercase, lowercase, numbers, and special characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, numbers, and special characters."
      ),
    confirm_password: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;

export default function CreatePasswordPage() {
  const router = useRouter();
  const { CreatePassword } = useAuthContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query.email]);

  const [hidePassword, setHidePassword] = useState(false);
  const togglePasswordVisibility = () => setHidePassword(!hidePassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = { email, password: data.password, confirm_password: data.confirm_password };
      console.log("Payload to backend:", payload);
      await CreatePassword(payload);
      router.push("/login"); // Redirect to login page after successful password creation
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full lg:min-h-[850px]">
      <div className="bg-background text-white hidden lg:flex items-center justify-center">
        <Image src={auth} alt="Authentication Illustration" className="w-full" />
      </div>
      <div className="px-4 md:px-16">
        <div className="pt-5 pb-3 flex justify-end">
          <Image src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Create Password</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded-md py-2 px-3 border  focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={hidePassword ? "text" : "password"}
                {...register("password")}
                className="w-full rounded-md py-2 px-3 border focus:outline-none focus:ring focus:ring-blue-300"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {hidePassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={hidePassword ? "text" : "password"}
              {...register("confirm_password")}
              className="w-full rounded-md py-2 px-3 border focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
