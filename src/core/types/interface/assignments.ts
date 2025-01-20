export interface Assignment {
    assignmentTitle: string;
    courseLesson: string;
    dueDate: string;
    status: 'Done' | 'Progress' | 'Pending';
    submit: 'Submitted' | 'Upload';
  }