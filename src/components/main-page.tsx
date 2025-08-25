'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Bell, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateNotificationAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

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

const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="/" className="text-2xl font-bold text-blue-600">UNIGENT</a>
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex items-center space-x-8 text-gray-600">
          <a href="/my-page" className="hover:text-blue-600">마이페이지</a>
          <a href="/program" className="hover:text-blue-600">프로그램</a>
          <a href="/career" className="hover:text-blue-600">진로/취업</a>
          <a href="/curriculum" className="hover:text-blue-600">커리큘럼agent</a>
        </nav>
        <button className="text-gray-500 hover:text-gray-700">
          <Bell />
        </button>
      </div>
    </div>
  </header>
);

const NotificationAgentModal = ({ selectedDate, onOpenChange, onNotificationSave }: { selectedDate: Date; onOpenChange: (open: boolean) => void; onNotificationSave: (date: Date) => void; }) => {
    const [generatedNotification, setGeneratedNotification] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        userName: '',
        courseName: '',
        deadline: selectedDate.toISOString().split('T')[0],
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
        
        // Timezone-safe date creation
        const [year, month, day] = data.deadline.split('-').map(Number);
        const savedDate = new Date(year, month - 1, day);

        onNotificationSave(savedDate);
        toast({
            title: '알림 저장됨',
            description: `${savedDate.toLocaleDateString()}의 일정이 저장되었습니다.`,
        });
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
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle>AI Agent: 맞춤 알림 생성</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
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
                                    <Input type="date" {...field} />
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
                                    생성 및 저장 중...
                                </>
                                ) : (
                                '생성 및 저장'
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="w-full h-full bg-gray-100 rounded-md p-4 flex items-center justify-center">
                    {isLoading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    ) : (
                        <p className="text-gray-500 text-center whitespace-pre-wrap">
                        {generatedNotification || '이곳에 생성된 알림이 표시됩니다.'}
                        </p>
                    )}
                </div>
            </div>
        </DialogContent>
    );
};

const Calendar = () => {
    const today = new Date(2025, 4, 16);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<Date[]>([
        new Date(2025, 4, 4), new Date(2025, 4, 5), new Date(2025, 4, 11), 
        new Date(2025, 4, 12), new Date(2025, 4, 18), new Date(2025, 4, 19), 
        new Date(2025, 4, 25), new Date(2025, 4, 26)
    ]);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const calendarDays = Array(firstDayOfMonth).fill(null).concat(days);
    
    const handleDateClick = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleNotificationSave = (date: Date) => {
        setEvents(prevEvents => {
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (!prevEvents.some(eventDate => eventDate.getTime() === newDate.getTime())) {
                const newEvents = [...prevEvents, newDate];
                return newEvents;
            }
            return prevEvents;
        });
    };

    const hasEventOn = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        return events.some(eventDate => 
            eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
        );
    };

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} <span className="text-gray-500 font-medium">{currentYear}</span></span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div key={day} className={day === '일' ? 'text-red-500' : (day === '토' ? 'text-blue-500' : '')}>{day}</div>
                    ))}
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <div className="grid grid-cols-7 text-center text-sm">
                        {calendarDays.map((day, index) => (
                            <div key={index} className="py-1 relative flex justify-center">
                                {day && (
                                    <DialogTrigger asChild>
                                        <button onClick={() => handleDateClick(day)} className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'} ${(firstDayOfMonth + day - 1) % 7 === 0 ? 'text-red-500' : ''}`}>
                                            {day}
                                        </button>
                                    </DialogTrigger>
                                )}
                                {day && hasEventOn(day) && (
                                    <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full pointer-events-none"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    {selectedDate && <NotificationAgentModal selectedDate={selectedDate} onOpenChange={setIsModalOpen} onNotificationSave={handleNotificationSave} />}
                </Dialog>
            </CardContent>
        </Card>
    );
};

const ProgramSchedule = () => {
    const schedules = [
        { title: '{대기업}2025 합동 채용 설명회', date: '2025.05.13~2025.05.27' },
        { title: '장학금 최대 60만원 지급!! 대기업 취...', date: '2025.05.14~2025.05.31' },
        { title: '정보처리기사 필기특강(3주 단기 특강)', date: '2025.05.15~2025.05.23' }
    ];

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle className="text-lg">프로그램 일정</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {schedules.map((item, index) => (
                        <div key={index}>
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                            <p className="text-sm text-gray-500">전발일: {item.date}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const CreditStatusChart = () => {
    const data = [
        { name: '공통교양', value: 43, total: 64, percentage: (43/64)*100 },
        { name: '심화교양', value: 15, total: 15, percentage: 100 },
        { name: '전공필수', value: 9, total: 9, percentage: 100 },
        { name: '전공선택', value: 33, total: 63, percentage: (33/63)*100 },
    ];

    return (
        <Card className="col-span-1 md:col-span-2 bg-[#F0F5FF] h-full">
            <CardContent className="p-4 h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 14, fill: '#4B5563' }} 
                          axisLine={false} 
                          tickLine={false}
                          dy={10}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          ticks={[100]} 
                          tickFormatter={(value) => `${value}%`}
                          tick={{ fontSize: 12, fill: '#3B82F6' }}
                          axisLine={false} 
                          tickLine={false}
                          width={40}
                        />
                        <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                            <LabelList 
                                dataKey="value" 
                                position="top" 
                                formatter={(value: number, _entry: any, index: number) => {
                                  const item = data[index];
                                  return item ? `${item.value}/${item.total}` : '';
                                }}
                                style={{ fontSize: 14, fill: '#3B82F6', fontWeight: 500 }}
                                offset={10} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const ProgramCard = ({ imgSrc, title, category, period, personnel, link }: { imgSrc: string; title: string; category: string; period: string; personnel: string; link: string; }) => (
  <a href={link} className="block group">
    <Card className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow h-full">
        <div className="relative w-full h-40">
            <Image src={imgSrc} alt={title} layout="fill" objectFit="cover" data-ai-hint="online course programming" />
        </div>
        <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="text-sm space-y-1 text-gray-600">
                <p><span className="font-semibold text-gray-800">구분</span> {category}</p>
                <p><span className="font-semibold text-gray-800">모집기간</span> {period}</p>
                <p><span className="font-semibold text-gray-800">모집인원</span> {personnel}</p>
            </div>
        </CardContent>
    </Card>
  </a>
);

const RecommendedPrograms = () => {
    const programs = [
        {
            imgSrc: '/images/frame.png',
            title: '정보처리기사 필기 특강',
            category: '취업 프로그램',
            period: '2025.05.15~2025.05.23',
            personnel: '50명',
            link: '#'
        },
        {
            imgSrc: '/images/frame2.png',
            title: 'TOPCIT 정기평가 수요조사',
            category: '취업 프로그램',
            period: '2025.04.04~2025.04.23',
            personnel: '35명',
            link: '#'
        },
        {
            imgSrc: '/images/frame3.png',
            title: '(대기업) 2025 합동 채용설명회',
            category: '취업 프로그램',
            period: '2025.05.13~2025.05.27',
            personnel: '제한없음',
            link: '#'
        },
        {
            imgSrc: '/images/frame4.png',
            title: '학습성과 경진대회',
            category: '행사 프로그램',
            period: '2025.05.12~2025.05.30',
            personnel: '제한없음',
            link: '#'
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">나만의 추천 프로그램</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {programs.map((program, index) => (
                    <ProgramCard key={index} {...program} />
                ))}
            </div>
        </section>
    );
};

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 h-full">
                    <Calendar />
                </div>
                <div className="lg:col-span-1 h-full">
                    <ProgramSchedule />
                </div>
                <div className="lg:col-span-2 h-full">
                    <CreditStatusChart />
                </div>
            </div>
            <RecommendedPrograms />
        </main>
    </div>
  );
}
