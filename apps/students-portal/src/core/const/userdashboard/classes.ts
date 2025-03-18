import { StaticImageData } from "next/image";
import avatar from "../../../assets/courses/avatar.png"; // Replace with actual image path

export type Session = {
  tutor?: string;
  name?: string;
  avatar?: StaticImageData;
  role?: string;
  sessionTitle?: string;
  time?: string;
  timer?: string;
  duration?: string;
  date?: string;
  joinButton?: {
    text?: string;
    isActive?: boolean;
  };
};

export type Tab = {
  tabName: string;
  isActive: boolean;
  sessions: Session[];
};




export const sessionTabs: Tab[] = [
  {
    tabName: "Active sessions",
    isActive: true,
    sessions: [
      {
        tutor: "Boss Tee",
        avatar: avatar,
        role: "Tutor",
        sessionTitle: "UX Design Fundamentals",
        time: "1:30 PM",
        duration: "1hr 20 minutes",
        joinButton: {
          text: "Join Now",
          isActive: true,
        },
      },
      {
        tutor: "Emediong",
        avatar: avatar,
        role: "Tutor",
        sessionTitle: "Interaction Design",
        time: "1:30 PM",
        duration: "1hr 20 minutes",
        joinButton: {
          text: "Join Now",
          isActive: false,
        },
      },
      {
        tutor: "Emediong",
        avatar: avatar,
        role: "Tutor",
        sessionTitle: "Interaction Design",
        time: "1:30 PM",
        duration: "1hr 20 minutes",
        joinButton: {
          text: "Join Now",
          isActive: false,
        },
      },
    ],
  },
  {
    tabName: "Upcoming sessions",
    isActive: false,
    sessions: [
      {
        sessionTitle: "Product design",
        name: "Abraham",
        role: "Tutor",
        avatar: avatar, // Replace with actual image path
        date: "Monday, 28 June 2021",
        time: "02:00 PM - 03:30 PM",
      },
      {
        sessionTitle: "Web development",

        name: "Bella",
        role: "Project Manager",
        avatar: avatar, // Replace with actual image path

        date: "Tuesday, 29 June 2021",
        time: "09:30 AM - 11:00 AM",
      },
      {
        sessionTitle: "UX design",

        name: "Charlie",
        role: "Data Analyst",
        avatar: avatar, // Replace with actual image path

        date: "Wednesday, 30 June 2021",
        time: "03:30 PM - 05:00 PM",
      },
      {
        sessionTitle: "UI design",
        name: "David",
        role: "QA Tester",
        avatar: avatar, // Replace with actual image path
        date: "Thursday, 1 July 2021",
        time: "10:00 AM - 11:30 AM",
      },
      {
        sessionTitle: "Illustration",
        name: "Ella",
        role: "Business Analyst",
        avatar: avatar, // Replace with actual image path
        date: "Friday, 2 July 2021",
        time: "02:00 PM - 03:30 PM",
      },
      {
        sessionTitle: "Motion graphics",

        name: "Felix",
        role: "SEO Specialist",
        avatar: avatar, // Replace with actual image path

        date: "Saturday, 3 July 2021",
        time: "09:30 AM - 11:00 AM",
      },
      {
        sessionTitle: "App design",

        name: "Grace",
        role: "Market Researcher",
        avatar: avatar, // Replace with actual image path

        date: "Sunday, 4 July 2021",
        time: "03:30 PM - 05:00 PM",
      },
      {
        sessionTitle: "Industrial design",

        name: "Henry",
        role: "Content Strategist",
        avatar: avatar, // Replace with actual image path

        date: "Monday, 5 July 2021",
        time: "10:00 AM - 11:30 AM",
      },
      {
        sessionTitle: "Visual design",

        name: "Isabel",
        role: "UX Researcher",
        avatar: avatar, // Replace with actual image path

        date: "Tuesday, 6 July 2021",
        time: "02:00 PM - 03:30 PM",
      },
    ],
  },
  {
    tabName: "Past sessions",
    isActive: false,
    sessions: [
      {
        tutor: "Emmanuel",
        avatar: avatar,
        role: "Tutor",
        timer: "1hr 30 Mins",
        sessionTitle: "UX Design Fundamentals",
        time: "03.30 - 05.00 PM",
        date: "Wednesday, 30 June 2021",
        joinButton: {
          text: "Join Now",
          isActive: true,
        },
      },
      {
        tutor: "Ella",
        role: "Designer",
        avatar: avatar,
        timer: "1hr 20 Mins",
        sessionTitle: "Typography Basics",
        time: "10.00 - 12.30 PM",
        date: "Friday, 2 July 2021",
        joinButton: {
          text: "Join Now",
          isActive: false,
        },
      },
      {
        tutor: "Emediong",
        role: "Tutor",
        avatar: avatar,
        timer: "2 Hours",
        sessionTitle: "Interaction Design",
        time: "02.00 - 04.30 PM",
        date: "Friday, 2 July 2021",
        joinButton: {
          text: "Join Now",
          isActive: false,
        },
      },
      {
        tutor: "Maya",
        role: "Developer",
        avatar: avatar,
        timer: "2hr 30 Mins",
        sessionTitle: "Responsive Web Design",
        time: "02.00 - 04.30 PM",
        date: "Friday, 2 July 2021",
        joinButton: {
          text: "Join Now",
          isActive: false,
        },
      },
    ],

  },
];


