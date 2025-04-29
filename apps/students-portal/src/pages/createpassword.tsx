import Image from "next/image";
import logo from "../assets/logo.png";
import auth from "../assets/auth.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ICreatePassword } from "@/core/types/interface/auth";
import { useAuthContext } from "@/shared/context/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ParsedUrlQuery } from "querystring";
// import { useRouter } from "next/router";

const schema = z
  .object({
    email: z.union([
      z.string().email("Invalid email address"),
      z.array(z.string().email("Invalid email address")),
      z.undefined(),
    ]),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Use at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      ),
    confirm_password: z.string().min(1, "Confirm Password is required"),
    remember_me: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;

export default function CreatePasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const { CreatePassword } = useAuthContext();
  const { query } = useRouter();
  const { mail }: ParsedUrlQuery = router.query;
  const [email, setEmail] = useState(mail);

  useEffect(() => {
    if (query.email) {
      setEmail(query.email as string);
    }
  }, [query.email]);
  const [userData, setUserData] = useState<ICreatePassword>({
    email: "",
    password: "",
    confirm_password: "",
    remember_me: false,
  });
  const [hidePassword, setHidePassword] = useState(false);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  }
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload: FormData = {
        email,
        password: data.password,
        confirm_password: data.confirm_password,
        remember_me: data.remember_me,
      };
      await CreatePassword(payload);
      router.replace("/welcome");
    } catch (e) {
      const loginError = e as Error;
      setError(loginError.message?.split("\n") ?? [loginError.message]);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirm_password: "",
      remember_me: false,
    },
    mode: "onChange",
  });
  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full lg:min-h-[850px]">
      <div className="bg-background text-white  hidden lg:flex items-center justify-center h-screen">
        <div className="md:pt-[2.55rem] 2xl:mt-[37rem]">
          <Image
            src={auth}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div>
      <div className="md:px-[76px] xsm:px-4 ">
        <div className="pt-[30px] pb-[10px] flex items-end flex-row justify-end">
          <Image src={logo} alt="Futurelabs Logo" />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="p-5 mx-auto md:mt-[5rem] 2xl:mt-[8rem]">
          <h2 className="text-2xl font-semibold mb-6 text-black">
            Create password
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[27px] 2xl:gap-[5rem]"
        >
          <input
            type="email"
            value={email}
            readOnly
            {...register("email")}
            placeholder="Johndoe@gmail.com"
            className="w-full rounded-md py-3 px-3 mb-4 bg-white outline-gray-400 border focus:outline-none focus:border-background"
          />
          <div className="relative mb-4">
            <input
              value={userData.password}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              onChange={handleChange}
              type={hidePassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full rounded-md py-3 px-3 bg-white
                 outline-gray-400 border focus:outline-none focus:border-background"
              autoComplete="off"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {hidePassword ? (
                <FaRegEye size={20} className="text-gray-600" />
              ) : (
                <FaRegEyeSlash size={20} className="text-gray-600" />
              )}
            </div>
            {errors.password && (
              <p className="text-secondary text-[10px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <div>
              <input
                value={userData.confirm_password}
                {...register("confirm_password")}
                aria-invalid={errors.confirm_password ? "true" : "false"}
                onChange={handleChange}
                type={hidePassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-md py-3 px-3 bg-white outline-gray-400 border focus:outline-none focus:border-background"
                autoComplete="off"
              />
              {errors.confirm_password && (
                <p className="text-secondary text-[10px]">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <div className="flex items-center pt-5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("remember_me")}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 transition-all peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white  after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  Remember me
                </span>
              </label>
            </div>
          </div>
          <div className="pb-5">
            <button
              type="submit"
              className="w-full bg-background text-white py-3 rounded-md hover:bg-background-dark focus:outline-none focus:ring focus:ring-blue-300 text-[20px]"
            >
              {!loading ? `Set password` : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
