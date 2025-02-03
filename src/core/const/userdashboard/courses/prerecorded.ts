
interface Imain{
  title:string
}
export  interface Section {
  description?: string
  title: string
  completed: boolean
  duration: string
  totalItems: string
  id:string;
  courseTitle:Imain;
  lessons: {
      src:string  
      title: string
      completed: boolean
    }[]
  }
  
  export const prerecordedCourses: { sections: Section[] } = {
    sections: [
      {
        title: "Design Intro",
        completed: false,
        duration: "60min Total",
        totalItems: "2/18",
        lessons: [
          {
            title: "product design introduction",
            completed: true,
            src: "https://www.youtube.com/watch?v=-wxoH9cZ_8g"
          },
          {
            title: "user research methods",
            completed: false,
            src: "https://www.youtube.com/watch?v=4ldPT4nbx5c"
          },
          {
            title: "wire framing techniques",
            completed: false,
            src: "https://www.youtube.com/watch?v=qpH7-KFWZRI&t=29s"
          },
          {
            title: "prototyping tools",
            completed: false,
            src: "https://www.youtube.com/watch?v=1c9LsuN3zVY"
          }
        ],
        id: "1",
        courseTitle:{
          title:"Introduction to product design"
        }
      },
      {
        title: "Color theory",
        completed: false,
        duration: "112 Minutes Total",
        totalItems: "3/22",
        lessons: [
          {
            title: "Color theory",
            completed: true,
            src: "https://www.youtube.com/watch?v=-wxoH9cZ_8g"
          },
          {
            title: "user research methods",
            completed: false,
            src: ""
          },
          {
            title: "wire framing techniques",
            completed: false,
            src: ""
          },
          {
            title: "prototyping tools",
            completed: false,
            src: ""
          }
        ],
        id: "2",
        courseTitle: {
          title:"Color theory"
        }
      },
      {
        title: "Typography",
        completed: false,
        duration: "120 Minutes Total",
        totalItems: "4/22",
        lessons: [],
        id: "3",
        courseTitle: {
          title:"Introduction to product design"
        }
      },
      {
        title: "Grid Systems",
        completed: false,
        duration: "120 Minutes Total",
        totalItems: "5/22",
        lessons: [],
        id: "4",
        courseTitle:{
          title:"Introduction to product design"
        }
      },
      {
        title: "Visual Hierarchy",
        completed: false,
        duration: "105 Minutes Total",
        totalItems: "6/22",
        lessons: [],
        id: "5",
        courseTitle: {
          title:"Introduction to product design"
        }
      }
    ]
  }



  
  // export interface CourseSection {
  //   title: string
  //   duration: string
  //   completed?: boolean
  // }
  
  // export interface CourseCardProps {
  //   id: string
  //   title: string
  //   image: string
  //   instructor: string
  //   role: string
  //   duration: string
  //   progress: number
  //   description?: string
  //   sections?: CourseSection[]
  // }
  // export const prerecordedCourses: CourseCardProps[] = [
  //   {
  //     id: "1",
  //     title: "Introduction to Product Design",
  //     image: "...",
  //     instructor: "John Doe",
  //     role: "Senior Product Designer",
  //     duration: "2h 30m",
  //     progress: 60,
  //     sections: [
  //       {
  //         title: "Design Intro",
  //         duration: "45 min",
  //         completed: true
  //       },
  //       {
  //         title: "Color Theory",
  //         duration: "30 min",
  //         completed: false
  //       },
  //       {
  //         title: "Typography",
  //         duration: "35 min",
  //         completed: false
  //       },
  //       {
  //         title: "Grid Systems",
  //         duration: "40 min",
  //         completed: false
  //       }
  //     ]
  //   },

  // ]
  
  