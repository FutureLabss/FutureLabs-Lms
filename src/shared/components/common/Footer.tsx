import Button from "./Button";


export default function Footer() {
  return (
    <div className="flex flex-col bg-primary h-screen ">
      <div className="mx-auto bg-tertairy flex flex-col gap-5 items-center justify-center py-10 px-10 text-white rounded-b-[30px]">
        <div className="text-center flex flex-col gap-2">
          <h5 className="text-2xl">Do you have any questions?</h5>
          <p className="text-[1rem] font-light">We will provide detailed information about our services, types of work, and top projects.</p>

        </div>
        <div className="flex border border-white/20 rounded-[1rem] w-full pl-5 pr-[2px] py-1">
          <input type="text" placeholder="Your email" className="flex-1 bg-transparent" />
          <Button className="rounded-[1rem] h-12" color="orange" radius="rounded16">Send Request</Button>
        </div>

      </div>
    </div>
  )
}
