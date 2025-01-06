import CoursePage from ".";


export default function WhatYouWillLearn() {
  return (
    <CoursePage>
      <div className="flex flex-col gap-4">
        <h2 className="text-primary text-[1.75rem] font-semibold">What you will learn</h2>
        <ul className="list-disc flex flex-col gap-2">
          <li>  HTML & CSS: Master the basics of structuring and styling modern, responsive websites.</li>
          <li>JavaScript: Create dynamic, interactive user experiences with essential programming skills.</li>
          <li>Responsive Design: Build websites that adapt seamlessly across all devices.</li>
          <li>Front-End Frameworks: Learn React for creating efficient and dynamic user interfaces.</li>
          <li>Version Control: Manage and collaborate on code using Git and GitHub.</li>
          <li>Web Performance Optimization: Improve website speed and user experience with best practices.</li>
          <li>Debugging Skills: Develop strategies to identify and fix coding errors effectively.</li>
        </ul>
      </div>
    </CoursePage>

  )
}
