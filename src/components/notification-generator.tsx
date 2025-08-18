'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { generateNotificationAction } from '@/app/actions';
import type { Course, Deadline } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface NotificationGeneratorProps {
  courses: Course[];
  deadlines: Deadline[];
}

const notificationSchema = z.object({
  deadlineId: z.string().min(1, 'Please select a deadline'),
  userName: z.string().min(1, 'Your name is required'),
  notificationPreferences: z.string().min(1, 'Preference is required'),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function NotificationGenerator({ courses, deadlines }: NotificationGeneratorProps) {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      userName: 'Alex',
      notificationPreferences: 'email',
    },
  });

  const onSubmit = async (data: NotificationFormValues) => {
    setIsLoading(true);
    setGeneratedMessage('');
    try {
      const selectedDeadline = deadlines.find((d) => d.id === data.deadlineId);
      const selectedCourse = courses.find((c) => c.id === selectedDeadline?.courseId);

      if (!selectedDeadline || !selectedCourse) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not find the selected course or deadline.',
        });
        return;
      }

      const result = await generateNotificationAction({
        userName: data.userName,
        courseName: selectedCourse.name,
        deadline: selectedDeadline.dueDate.toLocaleDateString(),
        taskDescription: selectedDeadline.title,
        notificationPreferences: data.notificationPreferences,
      });

      setGeneratedMessage(result.notificationMessage);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'AI Generation Failed',
        description: 'There was an issue generating the notification. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot /> AI Notification Generator
        </CardTitle>
        <CardDescription>Generate a personalized reminder for an upcoming task.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="notificationPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preference</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="deadlineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upcoming Task</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task to be reminded of" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deadlines
                        .filter((d) => d.dueDate >= new Date())
                        .map((deadline) => (
                          <SelectItem key={deadline.id} value={deadline.id}>
                            {deadline.title} ({courses.find(c => c.id === deadline.courseId)?.name}) - {deadline.dueDate.toLocaleDateString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Generate Reminder</>}
            </Button>
          </form>
        </Form>
        {generatedMessage && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Generated Message:</h3>
            <Textarea readOnly value={generatedMessage} rows={4} className="bg-accent" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
