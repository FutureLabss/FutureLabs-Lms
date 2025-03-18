import { Assignment } from "@/core/types/interface/assignments";
import { TableHeader } from "@/core/types/interface/component/table";
import AssignmentsTableActionComponent from "@/shared/components/assignments/tabledata/tabledata";

export const headers: TableHeader<Assignment>[] = [
  { field: 'assignmentTitle', title: 'Assignment Title', },
  { field: 'courseLesson', title: 'Course/lessons', },
  { field: 'dueDate', title: 'Due Date', },
  { field: 'status', title: 'Status', type: "chip" },
  {
    field: "action", title: 'Submit',
    action: {
      component: (props) =>
        <AssignmentsTableActionComponent
          {...props} />
    }
  },
];

export const assignmentsData: Assignment[] = [
  {
    assignmentTitle: 'Conducting User Research',
    courseLesson: 'User Research and Personas',
    dueDate: 'July 1, 2024',
    status: 'Done',
    submit: 'Submitted',
    id: "1",
    allowLateSubmission: true
  },
  {
    assignmentTitle: 'Competitive Analysis Report',
    courseLesson: 'Competitive Analysis in UX',
    dueDate: 'July 25, 2024',
    status: 'Progress',
    submit: 'Upload',
    id: "2",
    allowLateSubmission: true
  },
  {
    assignmentTitle: 'Creating Wireframes',
    courseLesson: 'Wireframing and Prototyping',
    dueDate: 'August 1, 2024',
    status: 'Progress',
    submit: 'Upload',
    id: "3",
    allowLateSubmission: true
  },
  {
    assignmentTitle: 'Usability Testing and Feedback',
    courseLesson: 'Usability Testing and Iterations',
    dueDate: 'August 22, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "4",
    allowLateSubmission: true
  },
  {
    assignmentTitle: 'Developing Visual Design',
    courseLesson: 'Visual Design and Branding',
    dueDate: 'August 29, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "5",
    allowLateSubmission: true
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "6",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "7",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "8",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "9",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "10",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "11",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "12",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "13",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "14",
    allowLateSubmission: false
  },
  {
    assignmentTitle: 'Creating a Design System',
    courseLesson: 'Design Systems and Components',
    dueDate: 'September 5, 2024',
    status: 'Pending',
    submit: 'Upload',
    id: "15",
    allowLateSubmission: false
  },
];

