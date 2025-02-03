import Link from "next/link";
import Button from "./Button";
import { Icon } from "./icon";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="px-4 py-4 md:py-[3rem] md:px-[3rem]  lg:[4rem] flex flex-col bg-primary relative">

      <div className=" flex justify-between flex-col md:flex-row gap-3">
        <div className="flex flex-col text-white/80 w-[70%] gap-4">
          <h6 className="text-white/40">Navigation</h6>
          <div className="flex justify-between md:gap-[96px] md:max-w-[350px]">
            <ul className="flex flex-col gap-2">
              <li><Link href={"#"}>Schedule</Link></li>
              <li><Link href={"#"}>Courses</Link></li>
              <li><Link href={"#"}>Pricing</Link></li>
              <li><Link href={"#"}>Payment</Link></li>
              <li><Link href={"#"}>Books</Link></li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li><Link href={"#"}>About school</Link></li>
              <li><Link href={"#"}>Gallery</Link></li>
              <li><Link href={"#"}>News</Link></li>
              <li><Link href={"#"}>Contacts</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <ul className="pt-[5rem] text-white/40 flex flex-col gap-[2px] hideen">
              <li>Copyright</li>
              <li>Privacy</li>
              <li>All rights reserved</li>
            </ul>

          </div>
        </div>

        <div className=" text-white/80 w-full flex flex-col gap-[30px]">
          <div className="flex justify-between w-full flex-wrap md:flex-nowrap ">
            <div className="flex flex-col gap-2 w-full pr-6 ">
              <h6 className="text-white/40">Contact us</h6>
              <div className="flex justify-between w-full  max-w-[420px] flex-wrap">
                <div>
                  <p className="py-2">+1 (406) 555-0120</p>
                  <p>+1 (480) 555-0103</p>
                </div>
                <p className=" py-2 ">hellp@Futurelabsacademy.com</p>
              </div>
            </div>
            <div className="py-2 md:py-0">
              <Button type="submit" className="text-secondary border-secondary min-w-[247px]" isBorder={true} color="black" radius="large">Apply Now</Button>
            </div>
          </div>

          <div className="flex max-w-[496px] w-full justify-between flex-wrap">
            <div className="flex flex-col gap-6">
              <h6 className="text-white/40">Follow us</h6>
              <ul className="flex gap-2">
                <Link href={"#"}><Icon.FaceBook /></Link>
                <Link href={"#"}><Icon.Google /></Link>
                <Link href={"#"}><Icon.Instagram /></Link>
                <Link href={"#"}><Icon.Youtube /></Link>

              </ul>
            </div>
            <div className="flex flex-col gap-6 pt-3 xsm:pt-0">
              <h6 className="text-white/40">Let&apos;s Chat</h6>
              <ul className="flex gap-2">
                <Link href={"#"}><Icon.Wechat /></Link>
                <Link href={"#"}> <Icon.TwitterIcon className="" /></Link>
                <Link href={"#"}><Icon.WhatsappIcon /></Link>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-white/80">
            <h6 className="text-white/40">Location</h6>
            <p>No 3 Chubb road, ikot ekpene Akwa ibom state, Nigeria.</p>
          </div>

        </div>
      </div>
      <div className="md:hidden ">
        <ul className="pt-[3rem] text-white/40 flex  gap-8 hideen">
          <li>Copyright</li>
          <li>Privacy</li>
          <li>All rights reserved</li>
        </ul>
      </div>
      <div className="absolute hidden md:block bottom-0 left-0">
        <Image
          src="/shape.svg"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex justify-center md:w-[50%] text-white/40 items-end md:ml-auto border-orange-600 mt-7">
        <span className="flex-1">© 2024 — Futurelabs.ng</span>
        <p className="flex gap-8"><span>En</span> <span>Es</span></p>
      </div>
    </footer>
  )
}
