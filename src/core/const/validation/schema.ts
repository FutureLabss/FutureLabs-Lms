import { z } from "zod";

 export const schema = z
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