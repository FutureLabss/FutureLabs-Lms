export interface Assignment {
    allowLateSubmission: boolean;
    assignmentTitle: string;
    courseLesson: string;
    dueDate: string;
    status: 'Done' | 'Progress' | 'Pending';
    submit: 'Submitted' | 'Upload';
    id:string
  }