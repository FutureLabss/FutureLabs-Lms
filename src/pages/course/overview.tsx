import CoursePage from "./index"

export default function Overview() {
  return (
    <CoursePage>
      <div className="flex flex-col gap-4">
        <h2 className="text-primary text-[1.75rem] font-semibold">About this course</h2>
        <p className="leading-[1.875rem]">Step into the world of web development and unlock the skills to build modern, responsive, and interactive websites. This course takes you through the foundational aspects of coding, starting with HTML, CSS, and JavaScript, and advancing to frameworks like React and back-end technologies such as Node.js. You&apos;ll learn how to design visually stunning interfaces, create seamless user experiences, and ensure your websites are optimized for performance and accessibility. By the end of this course, you&apos;ll have the expertise to develop everything from personal portfolios to full-scale web applications, empowering you to bring your ideas to life on the internet.</p>

      </div>
    </CoursePage>
  )
}
