import { PropsWithChildren } from "react";
import Navbar from "../components/common/NavBar";

export default function UserLandingPageLayout({ children }: PropsWithChildren, ) {

  return (
    <div className=" ">
        <div>
            <Navbar />
        </div>
        <div className="border border-red-700">
      <main className="mt-16 flex-grow">{children}</main>
        </div>
    </div>
  );
}
