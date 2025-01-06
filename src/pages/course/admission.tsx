import CoursePage from ".";


export default function Admission() {
  return (
    <CoursePage>
      <div className="flex flex-col gap-4">
        <h2 className="text-primary text-[1.75rem] font-semibold">Admission requirements</h2>
        <ul className="list-disc flex flex-col gap-2">
          <li>Basic Computer Literacy: Understand how to use a computer, browse the internet, and manage files.</li>
          <li>Reliable Computer: Have a laptop or desktop with internet access and coding-ready specifications.</li>
          <li>Passion for Learning: Bring a strong interest in web development and motivation to succeed.</li>
          <li>No Prior Experience Needed: Suitable for beginners or anyone with minimal coding experience.</li>
          <li>English Proficiency: A basic understanding of English to follow instructions and materials.</li>
        </ul>
      </div>
    </CoursePage>
  )
}
