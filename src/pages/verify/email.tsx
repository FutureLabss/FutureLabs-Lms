import Image from "next/image";
import logo from "../../assets/logo.png";
import verifysuccessimg from "../../assets/verifysuccessimg.png";
import successlogin from "../../assets/successlogin.png";
import { useRouter } from "next/router";

export default function EmailVerificationSuccessful() {
    const router = useRouter();
    const { email, token } = router.query;
  const handleRedirectToLogin = () => {
    router.push("/createpassword");
  };

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-background text-white hidden md:flex items-center justify-center">
        <div className="md:pt-[2.55rem]">
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
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-black pt-5">
            Email Verification Successful!
          </h2>
          <div className="py-[24px] w-full max-w-[232px] mx-auto">
            <Image
              src={successlogin}
              alt="Success Icon"
              className="mx-auto mb-4"
            />
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Your email has been verified successfully. <br />
            Please proceed to Create Password.
          </p>
          <div className="mt-16">
          <button
            type="button"
            className="bg-background text-white py-3 px-6 rounded-md 
            hover:bg-background-dark focus:outline-none focus:ring
             focus:ring-blue-300 text-[20px] w-full max-w-[491px]"
            onClick={handleRedirectToLogin}
          >
            Create Password
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
