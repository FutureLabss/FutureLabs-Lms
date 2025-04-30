import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Joinus from "@/shared/components/auth/joinus";
import SignupCmponentFirstForm from "@/shared/components/auth/signup1";
import SignupCmponentSecondForm from "@/shared/components/auth/signup2";
import { ChangeEvent, SetStateAction, useState } from "react";
import { CreateUserProfile } from "@/core/types/interface/auth";
import { useAuthContext } from "@/shared/context/auth";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const { SignUp } = useAuthContext();
  const [formData, setFormData] = useState<CreateUserProfile>({
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
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: SetStateAction<CreateUserProfile>) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData) {
        await SignUp(formData);
        router.push(`/signup/accountcreated?email=${formData?.email}`);
        console.log(formData, "Submitted Data");
      }
    } catch (e) {
      const signUpError = e as Error;
      setError(signUpError.message?.split("\n") ?? [signUpError.message]);
      setError(signUpError.message?.split("\n") ?? [signUpError]);
      console.log(formData, "Submitted Data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="bg-white grid grid-cols-1 lg:grid-cols-2 ">
        {/* right */}
        <Joinus />
        {/* left */}
        <div className="container mx-auto">
          {step === 1 ? (
            <SignupCmponentFirstForm
              handleChange={handleChange}
              setStep={setStep}
              formData={formData}
            />
          ) : (
            <SignupCmponentSecondForm
              handleChange={handleChange}
              setStep={setStep}
              formData={formData}
              handleSubmit={handleSubmit}
              loading={loading}
              step={step}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}
