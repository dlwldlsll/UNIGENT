'use client';

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import {
  BookOpen,
  Calendar as CalendarIcon,
  ClipboardCheck,
  PlusCircle,
  PenSquare,
  Upload,
  Video,
  Users,
  Bell,
} from 'lucide-react';
import { addDays, isSameDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CourseForm } from '@/components/course-form';
import { DeadlineForm } from '@/components/deadline-form';
import NotificationGenerator from '@/components/notification-generator';
import type { Course, Deadline } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const initialCourses: Course[] = [
  { id: '1', name: 'Introduction to AI', professor: 'Dr. Turing', time: 'Mon/Wed 10:00', location: 'Hall A' },
  { id: '2', name: 'Data Structures', professor: 'Dr. Knuth', time: 'Tue/Thu 13:00', location: 'Room 101' },
];

const initialDeadlines: Deadline[] = [
  { id: '1', courseId: '1', title: 'Research Paper Outline', dueDate: new Date(), type: 'Assignment' },
  { id: '2', courseId: '2', title: 'Mid-term Exam', dueDate: addDays(new Date(), 7), type: 'Exam' },
  { id: '3', courseId: '1', title: 'Project Proposal', dueDate: addDays(new Date(), 12), type: 'Assignment' },
];

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [isDeadlineFormOpen, setIsDeadlineFormOpen] = useState(false);

  const upcomingDeadlines = deadlines.filter((d) => isSameDay(d.dueDate, selectedDate));

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: crypto.randomUUID() };
    setCourses([...courses, newCourse]);
  };

  const addDeadline = (deadline: Omit<Deadline, 'id'>) => {
    const newDeadline = { ...deadline, id: crypto.randomUUID() };
    setDeadlines([...deadlines, newDeadline]);
  };
  
  const getIconForType = (type: Deadline['type']) => {
    switch (type) {
      case 'Assignment': return <ClipboardCheck className="h-5 w-5 text-primary" />;
      case 'Exam': return <PenSquare className="h-5 w-5 text-destructive" />;
      case 'Task': return <Users className="h-5 w-5 text-yellow-500" />;
      default: return <ClipboardCheck className="h-5 w-5 text-primary" />;
    }
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <CourseForm open={isCourseFormOpen} onOpenChange={setIsCourseFormOpen} onCourseAdd={addCourse} />
      <DeadlineForm open={isDeadlineFormOpen} onOpenChange={setIsDeadlineFormOpen} onDeadlineAdd={addDeadline} courses={courses} />

      <aside className="w-64 flex-shrink-0 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">ScheduleZen</h1>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setIsCourseFormOpen(true)}>
            <PlusCircle className="h-5 w-5" />
            Add Course
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setIsDeadlineFormOpen(true)}>
            <PlusCircle className="h-5 w-5" />
            Add Deadline
          </Button>
          <Button variant="ghost" className="justify-start gap-2" disabled>
            <Upload className="h-5 w-5" />
            Import Schedule
          </Button>
          <Separator className="my-4" />
          <h2 className="text-lg font-semibold mb-2 px-4">My Courses</h2>
          <ScrollArea className="flex-grow">
            <div className="flex flex-col gap-2 pr-4">
              {courses.map((course) => (
                <div key={course.id} className="p-3 rounded-lg hover:bg-accent transition-colors">
                  <p className="font-semibold text-sm">{course.name}</p>
                  <p className="text-xs text-muted-foreground">{course.professor}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </nav>
      </aside>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md"
                modifiers={{
                  hasDeadline: deadlines.map(d => d.dueDate),
                }}
                modifiersStyles={{
                  hasDeadline: { 
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    textDecorationColor: 'hsl(var(--accent-foreground))',
                  },
                }}
              />
            </CardContent>
          </Card>
          <NotificationGenerator courses={courses} deadlines={deadlines} />
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                Tasks for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  <ul className="space-y-4">
                    {upcomingDeadlines.map((deadline) => {
                      const course = courses.find(c => c.id === deadline.courseId);
                      return (
                        <li key={deadline.id} className="flex items-start gap-4 p-3 rounded-lg bg-accent/50">
                          <div className="mt-1">{getIconForType(deadline.type)}</div>
                          <div>
                            <p className="font-semibold">{deadline.title}</p>
                            <p className="text-sm text-muted-foreground">{course?.name}</p>
                            <Badge variant="secondary" className="mt-1">{deadline.type}</Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                   <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tasks for today.</p>
                  <p className="text-sm text-muted-foreground">Select a different date to see other tasks.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
