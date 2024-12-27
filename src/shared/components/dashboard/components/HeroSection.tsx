import Button from '../../common/Button'

function HeroSection() {
  return (
    <div className='flex flex-col px-5 items-start justify-start w-full relative lg:px-12 mt-5'>
      <video src="/hero-video.mp4" width="100%" height="100%" autoPlay={true} muted={true} loop={true} className='absolute top-0 left-0 z-[-1] object-cover h-full xl:max-h-[620px]'></video>
      <div className='flex flex-col pt-[30px] sm:pt-[7rem] gap-2 md:gap-5 lg:pt-[16rem]  xl:pt-[15.9375rem] mb-6'>
        <h1 className='xsm:text-[16px] xxs:text-[24px] xs:text-[30px] xs:pt-10 sm:text-[40px] md:text-[45px] leading-normal lg:text-[50px] xl:text-[50px] lg:max-w-[800px] w-full text-white'>Where Your Journey to <span className='text-secondary'>Infinite Possibilities</span> Begins.</h1>
        <p className='text-white text-[12px] sm:text-[20px] lg:text-[1.875rem]'>Learn, Create, and Thrive with Future-Ready Tech Skills</p>
        <div className='pb-[0rem]'>
          <Button type='button' className='w-fit md:max-w-[400px] md:w-full py-1 sm:py-3 md:py-5' radius='extraSmall' color='orange'>Apply Now</Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection