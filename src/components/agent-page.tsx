'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateNotificationAction } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  userName: z.string().min(1, '이름을 입력해주세요.'),
  courseName: z.string().min(1, '과목을 입력해주세요.'),
  deadline: z.string().min(1, '마감기한을 입력해주세요.'),
  taskDescription: z.string().min(1, '내용을 입력해주세요.'),
  notificationPreferences: z.enum(['text', 'email'], {
    required_error: '알림 방법을 선택해주세요.',
  }),
});

type FormData = z.infer<typeof formSchema>;

const AgentPage = () => {
  const [generatedNotification, setGeneratedNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      courseName: '',
      deadline: '',
      taskDescription: '',
      notificationPreferences: 'text',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedNotification('');
    try {
      const result = await generateNotificationAction({
        ...data,
        notificationPreferences: data.notificationPreferences === 'text' ? '문자' : '메일'
      });
      setGeneratedNotification(result.notificationMessage);
    } catch (error) {
      console.error('Failed to generate notification:', error);
      toast({
        title: '오류',
        description: '알림 생성에 실패했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="/my-page" className="hover:text-blue-600">마이페이지</a>
            <a href="#" className="hover:text-blue-600">프로그램</a>
            <a href="#" className="hover:text-blue-600">진로/취업</a>
            <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">AI AGENT</h2>
          <p className="text-gray-600 mt-2">나의 학사 정보를 반영한 맞춤 알림을 생성해보세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>알림 생성</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="courseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>과목</FormLabel>
                        <FormControl>
                          <Input placeholder="자료구조" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>마감기한</FormLabel>
                        <FormControl>
                          <Input placeholder="2025-05-30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taskDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>내용</FormLabel>
                        <FormControl>
                          <Textarea placeholder="알고리즘 과제" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notificationPreferences"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>알림 받을 방법</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="text" />
                              </FormControl>
                              <FormLabel className="font-normal">문자</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="email" />
                              </FormControl>
                              <FormLabel className="font-normal">메일</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      '생성'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="flex items-center justify-center">
            <CardContent className="pt-6 w-full">
              <div className="w-full h-[450px] bg-gray-100 rounded-md p-4 flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                ) : (
                  <p className="text-gray-500 text-center whitespace-pre-wrap">
                    {generatedNotification || '이곳에 생성된 알림이 표시됩니다.'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AgentPage;
