import clsx from "clsx";
import { Icon } from "./icon";
import Link from "next/link";
import {useRouter } from "next/router";
import { useState } from "react";
import Button from "./Button";

type NavLinksProps = {
  to: string;
  children: React.ReactNode;
};

const NavLinks = ({ to, children }: NavLinksProps) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <Link
      href={to}
      className={clsx(
        "font-medium hover:text-orange-600 lg:text-[20px] relative",
        isActive ? "text-primary" : "text-[#212C4A4D]"
      )}
    >
      {children} {isActive && <p className="rounded-full w-[6px] h-[6px] inline-block bg-secondary absolute"></p>}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  return (
    <nav className="border-b  bg-white px-5 lg:px-12 py-4 z-20 fixed w-full">
      <div className="flex items-center justify-between  gap-4 md:gap-0">
        {/* Logo */}
        <div className="text-orange-600 font-bold text-xl">
          <Icon.Futurelogo className="w-[156px] h-24" />
        </div>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <NavLinks to="/">Home</NavLinks>
          </li>
          <li>
            <NavLinks to="/schools">Schools</NavLinks>
          </li>
          <li>
            <NavLinks to="/why-future-academy">Why Future Academy</NavLinks>
          </li>
        </ul>
      <Button
        className="py-[10px] max-w-[189px] w-full hidden md:block"
        isBorder={true}
        color="black"
        radius="extraSmall"
      >
        <Link href="https://futurelabs-two.vercel.app/services/learnskill" passHref>
        Apply now
    </Link>
      </Button>

        {/* Mobile Menu */}

        <div
          className={clsx(
            "md:hidden top-12 inset-0 bg-white absolute z-10 transform  h-screen",
            "transition-transform duration-700 ease-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col items-start px-6 mt-4 h-full bg-white gap-4">
            <NavLinks to="/">Home</NavLinks>
            <NavLinks to="/schools">Schools</NavLinks>
            <NavLinks to="/why-future-academy">Why Future Academy</NavLinks>
            <Button className="py-[10px] max-w-[189px] w-full" isBorder={true} color="orange" radius="extraSmall">
            <Link href="https://futurelabs-two.vercel.app/services/learnskill" passHref>
              Apply now
          </Link>
            </Button>
          </div>
        </div>


        {/* Hamburger Icon (for mobile view) */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Icon.Close className="size-8" /> :
            <Icon.HamBurger className="size-8" />
          }
        </div>
      </div>
    </nav>
  );
}


