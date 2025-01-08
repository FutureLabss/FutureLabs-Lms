import Link from 'next/link'
import Button from '../../common/Button'

function HeroSection() {
  return (
    <div className='flex flex-col px-5 items-start justify-start w-full relative lg:px-12 mt-5'>
      <video src="/hero-video.mp4" width="100%" height="100%" autoPlay={true} muted={true} loop={true} className='absolute top-0 left-0 z-[-2] object-cover h-full xl:max-h-[690px]'></video>
      <div className='flex flex-col pt-[9rem] sm:pt-[7rem] gap-2 md:gap-5 lg:pt-[20rem] mb-4 xl:pt-[12.9375rem] xs:mb-6'>
        <h1 className='font-semibold xsm:text-[18px] xxs:text-[24px] xs:text-[1.875rem] xs:pt-10 sm:text-[40px] md:text-[2.8125rem] leading-[1.3] lg:text-[3.125rem] xl:text-[3.5rem] max-w-[40.6875rem] w-full text-white'>Where Your Journey to <span className='text-secondary'>Infinite Possibilities</span> Begins.</h1>
        <p className='font-medium text-white text-[10px] xxs:text-[.75rem] sm:text-[20px] lg:text-[1.625rem]'>Learn, Create, and Thrive with Future-Ready Tech Skills</p>
        <div className=''>
          <Button type='button' className='max-w-[400px] text-[18px] md:w-full py-1 sm:py-2 md:py-5 '
           radius='large' color='orange'>
           <Link href="https://futurelabs-two.vercel.app/services/learnskill" passHref>
              Apply now
          </Link>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection