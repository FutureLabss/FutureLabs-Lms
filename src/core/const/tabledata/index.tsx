import { Assignment } from "@/core/types/interface/assignments";
import { TableHeader } from "@/core/types/interface/component/table";
import AssignmentsTableActionComponent from "@/shared/components/assignments/tabledata/tabledata";

export const headers: TableHeader<Assignment>[] = [
    { field: 'assignmentTitle', title: 'Assignment Title',  },
    { field: 'courseLesson', title: 'Course/lessons', },
    { field: 'dueDate', title: 'Due Date',  },
    { field: 'status', title: 'Status',  type:"chip" },
    { field: "action", title: 'Submit', 
      action:  { component: (props) => <AssignmentsTableActionComponent {...props} />}
    },
  ];

  export const assignmentsData: Assignment[] = [
    {
      assignmentTitle: 'Conducting User Research',
      courseLesson: 'User Research and Personas',
      dueDate: 'July 1, 2024',
      status: 'Done',
      submit: 'Submitted',
    },
    {
      assignmentTitle: 'Competitive Analysis Report',
      courseLesson: 'Competitive Analysis in UX',
      dueDate: 'July 25, 2024',
      status: 'Progress',
      submit: 'Upload',
    },
    {
      assignmentTitle: 'Creating Wireframes',
      courseLesson: 'Wireframing and Prototyping',
      dueDate: 'August 1, 2024',
      status: 'Progress',
      submit: 'Upload',
    },
    {
      assignmentTitle: 'Usability Testing and Feedback',
      courseLesson: 'Usability Testing and Iterations',
      dueDate: 'August 22, 2024',
      status: 'Pending',
      submit: 'Upload',
    },
    {
      assignmentTitle: 'Developing Visual Design',
      courseLesson: 'Visual Design and Branding',
      dueDate: 'August 29, 2024',
      status: 'Pending',
      submit: 'Upload',
    },
    {
      assignmentTitle: 'Creating a Design System',
      courseLesson: 'Design Systems and Components',
      dueDate: 'September 5, 2024',
      status: 'Pending',
      submit: 'Upload',
    },
  ];
  
