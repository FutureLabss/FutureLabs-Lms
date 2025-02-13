import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import verifysuccessimg from "../../assets/verifysuccessimg.png";
import successlogin from "../../assets/successlogin.png";
// import { useAuthContext } from "@/shared/context/auth";
import Link from "next/link";

export default function AccountCreatedSuccessful() {
  const router = useRouter();
  // const [error, setError] = useState<string[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  // const [loading, setLoading]=useState(false)  
  // const{resendEmailVerification}=useAuthContext()

  useEffect(() => {
    if (router.isReady) {
      const queryEmail = router.query.email as string | undefined;
      if (queryEmail) {
        setEmail(queryEmail);
      }
    }
  }, [router.isReady, router.query]);
  // const handleResentEmail=()=>{
  //   try{
  //     if(id){
  //       resendEmailVerification(id as unknown as string)
  //       console.log(id, "userId")
  //     }
  //   }catch (e) {
  //     const signUpError = e as Error;
  //     setError(signUpError.message?.split("\n") ?? [signUpError.message]);
  //     setError(signUpError.message?.split("\n") ?? [signUpError]);
  //     console.log(id, "userId")
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-background text-white hidden md:flex items-center justify-center">
        <div className="md:pt-[2.55rem] 2xl:mt-[37rem]">
          <Image
            src={verifysuccessimg}
            alt="User Avatar"
            className="mx-auto w-[100%] md:w-[100%]"
          />
        </div>
      </div>
      <div className="md:px-[76px] pt-10 xsm:px-4">
        <div className="flex items-end flex-row justify-end w-full">
          <Image src={logo} alt="Futurelabs Logo" />
        </div>
        <div className="text-center 2xl:mt-[18rem]">
          <h2 className="text-2xl font-semibold mb-4 text-black pt-5">
            Account creation successful
          </h2>
          <div className="py-[18px] 2xl:py-[24px] w-full max-w-[232px] mx-auto">
            <Image
              src={successlogin}
              alt="Success Icon"
              className="mx-auto mb-4"
            />
          </div>
          <p className="text-blacktext-2xl text-center font-normal mb-6 w-full mx-auto max-w-[500px]">
            We&ldquo;ve sent a verification link to {email}.
            Please check your inbox and click on the link to verify your account.
          </p>
          <div className="mt-5 2xl:mt-16">
            <button
            // onClick={handleResentEmail}
              type="button"
              className="bg-background text-white py-3 px-6 rounded-md 
              hover:bg-background-dark focus:outline-none focus:ring
              focus:ring-blue-300 text-[20px] w-full max-w-[491px]"
            >
              Resend Email
            </button>
          </div>
          <div className="text-center pt-6">
            <p>
              Entered the wrong email?<span className="text-[#007AFF] pl-2"> <Link href={"/signup"}> Change it here</Link></span>
            </p>
            <p className="pt-5 pb-5  2xl:pt-20 2xl:pb-10 italic text-xs text-center">
              Didn&lsquo;t receive an email? Emails can sometimes take a few minutes to arrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
