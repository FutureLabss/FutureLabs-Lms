import Image from 'next/image'

export default function WhyChoseUs() {
  return (
    <div className="flex flex-col items-center justify-center gap-[64px] py-5 mt-4 px-4">
      <div className="text-center flex flex-col gap-4 -tracking-tight">
        <h2 className="text-2xl md:text-3xl font-semibold">Why Choose <span className="text-secondary">Us</span></h2>
        <p className="text-[1rem] md:text-[24px]">Dedicated to Shaping Tomorrow&apos;s Innovators, Today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-screen-xxl max-h-[20rem">
        {/* Left Large Image */}
        <div className="col-span-1 md:col-span-2 md:row-span-2">
          <Image
            src="/images/techhub.png"
            alt="Event audience"
            width={600}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Content */}
        <div className="col-span-1 md:col-span-2 bg-secondary/20 p-8 rounded-[30px] flex flex-col justify-center gap-6">
          <h3 className="text-[30px] font-bold mb-2">
            Future Labs Academy: Where Learning Meets Industry Excellence.
          </h3>
          <p className="text-lg">
            We go beyond traditional education by connecting you directly with the tech ecosystem. Our students gain exclusive access to premier events like DevFest, alongside seminars, workshops, and networking meetings with top minds in the industry.
          </p>
        </div>

        {/* Bottom Middle Image */}
        <div className="col-span-1">
          <Image
            src="/images/futurist.png"
            alt="Group learning"
            width={307}
            height={500}
            className="w-full h-full object-cover rounded-[1.875rem]"
          />
        </div>

        {/* Bottom Right Content */}
        <div className="col-span-1 bg-[#212C4A33] rounded-[1.875rem] px-8 py-6 flex flex-col gap-[4rem] ">
          <h3 className="text-2xl font-bold">Learn, Connect, and Innovate.</h3>
          <p className="text-[1rem]">
            From thought leadership to hands-on experiences, we ensure you&apos;re not only learning but building relationships and skills that will set you apart in the tech world.
          </p>
        </div>
      </div>

    </div>
  )
}
