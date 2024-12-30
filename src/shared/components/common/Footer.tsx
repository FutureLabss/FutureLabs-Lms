import Link from "next/link";
import Button from "./Button";
import { Icon } from "./icon";


export default function Footer() {
  return (
    <footer className="flex flex-col bg-primary px-4 ">
      <div className="md:mx-auto bg-tertairy flex flex-col gap-5 items-center justify-center py-10 sm:px-4 md:px-10 text-white rounded-b-[30px]">
        <div className="text-center flex flex-col gap-2">
          <h5 className="text-2xl">Do you have any questions?</h5>
          <p className="text-[1rem] font-light">We will provide detailed information about our services, types of work, and top projects.</p>

        </div>
        <div className="flex border border-white/20 rounded-[1rem] w-full px-2 pl-5 pr-1 py-1">
          <input type="text" placeholder="Your email" className="min-w-[100px] flex-1 bg-transparent outline-none placeholder:text-white" />
          <Button className=" rounded-[1rem] h-12 text-[10px] sm:text-sm xxs:text-[1rem]" color="orange" radius="rounded16">Send Request</Button>
        </div>

      </div>
      <div className="flex justify-between w-full flex-wrap-reverse md:px-10 xl:px-12 py-10">
        <div className="flex-1 w-[400px] flex flex-col text-white/40">
          <h5 className="flex-1 hidden xxs:block">Catalog</h5>
          <p className="mt-3 md:mt-0 flex justify-between">© 2025 — Copyright <span className="sm:hidden "> Privacy</span></p>

        </div>

        <div className="flex-[2] flex-col w-full flex flex-wrap md:flex-nowrap">
          <div className="flex justify-between flex-[2] flex-wrap md:flex-nowrap">
            <div className="flex-1 w-[300px] font-normal">
              <h5 className="mb-4 text-white/40">Services</h5>
              <ul className="mb-4 text-white">
                <li>We teach digital skills</li>
                <li>Consulting</li>
                <li>software developments</li>
              </ul>

              <div className="my-16">
                <Icon.Futurelogo />
              </div>

              <div className="flex gap-8 sm:gap-12 items-center">
                <ul className="text-white">
                  <li>+1 891 989-11-91</li>
                  <li>Info@futurelabs.com.ng</li>
                </ul>
                <div className="flex gap-1" ><Icon.TwitterIcon className="size-8 md:size-12" /> <Icon.WhatsappIcon className="size-8 md:size-12" /></div>
              </div>
            </div>
            <div className="w-[247px] flex justify-end items-start my-3 md:my-0 order-4 lg:my-0">
              <Button type="submit" className="text-secondary border-secondary min-w-[247px]" isBorder={true} color="black" radius="large">Apply Now</Button>
            </div>
          </div>
          <div className="flex justify-between py-[3rem] md:pt-[10rem]">
            <ul className="flex gap-4 text-white">
              <Link href={"/about"}>About us <span className="ml-3">/</span></Link>
              <Link href={"/news"}> News <span className="ml-3">/</span></Link>
              <Link href={"/contacts"}> Contacts <span className="ml-3">/</span></Link>
            </ul>
            <p className="text-white/40 hidden sm:block">Privacy</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
