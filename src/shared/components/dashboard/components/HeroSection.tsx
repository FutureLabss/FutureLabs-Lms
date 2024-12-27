import Button from '../../common/Button'

function HeroSection() {
  return (
    <div className='flex flex-col px-5 items-start justify-start w-full relative md:px-12'>
      <video src="/hero-video.mp4" width="100%" height="100%" autoPlay={true} muted={true} loop={true} className='absolute top-0 left-0 z-[-1] object-cover'></video>
      <div className='flex flex-col pt-[30px] gap-2 lg:gap-5 lg:pt-[15rem] xl:pt-[19.9375rem] pb-[27px]'>
        <h1 className=' text-[18px] sm:text-[40px] md:text-[50px] leading-normal lg-text-[70px] xl:text-[70px] lg:max-w-[800px] w-full xl:leading-[6rem] text-white'>Where Your Journey to <span className='text-secondary'>Infinite Possibilities</span> Begins.</h1>
        <p className='text-white text-[12px] sm:text-[20px] md:text-[1.875rem]'>Learn, Create, and Thrive with Future-Ready Tech Skills</p>
        <Button type='button' className='w-fit md:max-w-[400px] md:w-full sm:py-3 md:py-5' radius='extraSmall' color='orange'>Apply Now</Button>
      </div>
    </div>
  )
}

export default HeroSection