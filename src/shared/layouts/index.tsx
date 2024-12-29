import { PropsWithChildren } from "react";
import Navbar from "../components/common/NavBar";

export default function UserLandingPageLayout({ children }: PropsWithChildren, ) {

  return (
    <div className="h-screen flex flex-col min-h-screen ">
        <div>
            <Navbar />
        </div>
        <div className="">
      <main className="">{children}</main>
        </div>
    </div>
  );
}
