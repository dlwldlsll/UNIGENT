export type Course = {
  id: string;
  name: string;
  professor: string;
  time: string;
  location: string;
};

export type Deadline = {
  id: string;
  courseId: string;
  title: string;
  dueDate: Date;
  type: 'Assignment' | 'Exam' | 'Task';
};
