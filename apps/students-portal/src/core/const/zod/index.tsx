import { z } from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  surName: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  gender: z.enum(["Male", "Female"], { message: "Select a gender" }),
});

export const skillsDetailsSchema = z.object({
  skillChoice: z.string().min(2, "Skill choice is required"),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  ageRange: z.enum(["18-25", "26-35", "36+"], { message: "Select age range" }),
  howYouHeard: z.string().min(3, "Please specify how you heard about us"),
});

export const combinedSchema = personalDetailsSchema.merge(skillsDetailsSchema);
