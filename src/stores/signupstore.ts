import { create } from "zustand";
import { CreateUserProfile } from "@/core/types/interface/auth";

interface UserDataStore {
  formData: CreateUserProfile;
  setFormData: (update: Partial<CreateUserProfile> | ((prev: CreateUserProfile) => CreateUserProfile)) => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  formData: {
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    address: "",
    age_range: "",
    heard_about_us: "",
    gender: "male",
    experience: "beginner",
    skill: "web development",
  },
  setFormData: (update) =>
    set((state) => ({
      formData: typeof update === "function" ? update(state.formData) : { ...state.formData, ...update },
    })),
}));
